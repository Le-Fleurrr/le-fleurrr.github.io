// Shared Spotify Web API client: token handling, caching, album search and album fetch.
// Used by useSpotifyTracklist. Credentials follow the existing setup in this repo;
// note that anything shipped in a static frontend bundle is publicly visible.

const SPOTIFY_CLIENT_ID = '21d3924cf8654dd0abb91c72854ab95d';
const SPOTIFY_CLIENT_SECRET = 'e35cb04d48f3469f8c718b7e183a72f1';

const MARKET = 'AZ';
const ALBUM_CACHE_TTL = 24 * 60 * 60 * 1000;      // 24h — album data rarely changes
const SEARCH_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7d — title→id resolution is stable
const SEARCH_MISS_TTL = 60 * 60 * 1000;           // 1h — retry failed lookups sooner

let tokenPromise = null;

async function getSpotifyToken() {
  const savedToken = localStorage.getItem('spotify_auth_token');
  const expiry = localStorage.getItem('spotify_token_expiry');
  if (savedToken && expiry && Date.now() < parseInt(expiry)) {
    return savedToken;
  }

  // Dedupe concurrent token requests
  if (tokenPromise) return tokenPromise;

  tokenPromise = (async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        console.error('Spotify auth failed:', await response.text());
        return null;
      }

      const data = await response.json();
      localStorage.setItem('spotify_auth_token', data.access_token);
      localStorage.setItem('spotify_token_expiry', (Date.now() + (data.expires_in * 1000) - 60000).toString());
      return data.access_token;
    } catch (error) {
      console.error('Spotify auth error:', error);
      return null;
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    const { value, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(key);
      return undefined;
    }
    return value;
  } catch {
    return undefined;
  }
}

function writeCache(key, value, ttl) {
  try {
    localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + ttl }));
  } catch {
    // storage full — caching is best-effort
  }
}

// Strip store-format suffixes like "(2LP)", "[CD]", "(Kasset)", "(İlk Basma Nəşr)"
// so the remaining title matches what Spotify actually calls the album.
export function cleanAlbumTitle(title) {
  return String(title)
    .replace(/\s*[([][^)\]]*(?:\d\s*LP|LP|CD|Kaset|Kasset|Vinyl|Nəşr|Basma)[^)\]]*[)\]]/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function getPrimaryArtist(artist) {
  if (Array.isArray(artist)) return artist[0] || '';
  return String(artist || '').split('&')[0].trim();
}

// Resolve a catalog album to a Spotify album ID by search. Cached, including misses.
export async function searchAlbumId(title, artist) {
  const cleanTitle = cleanAlbumTitle(title);
  const primaryArtist = getPrimaryArtist(artist);
  if (!cleanTitle) return null;

  const cacheKey = `spotify_search_${(primaryArtist + '|' + cleanTitle).toLowerCase()}`;
  const cached = readCache(cacheKey);
  if (cached !== undefined) return cached || null;

  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const q = `album:${cleanTitle}` + (primaryArtist ? ` artist:${primaryArtist}` : '');
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album&limit=1&market=${MARKET}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    if (!response.ok) {
      console.error(`Spotify search error ${response.status}:`, await response.text());
      return null;
    }

    const data = await response.json();
    const id = data.albums?.items?.[0]?.id || null;
    writeCache(cacheKey, id || '', id ? SEARCH_CACHE_TTL : SEARCH_MISS_TTL);
    return id;
  } catch (error) {
    console.error('Spotify search error:', error);
    return null;
  }
}

const MONTHS_AZ = {
  '01': 'Yanvar', '02': 'Fevral', '03': 'Mart', '04': 'Aprel',
  '05': 'May', '06': 'İyun', '07': 'İyul', '08': 'Avqust',
  '09': 'Sentyabr', '10': 'Oktyabr', '11': 'Noyabr', '12': 'Dekabr'
};

// Fetch an album from Spotify and map it to the shape AlbumPage renders:
// track order, title, duration, explicit flag, artists, features and preview audio.
export async function fetchAlbumData(spotifyAlbumId) {
  const cacheKey = `spotify_album_${spotifyAlbumId}`;
  const cached = readCache(cacheKey);
  if (cached !== undefined) return cached || null;

  const token = await getSpotifyToken();
  if (!token) return null;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${spotifyAlbumId}?market=${MARKET}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    if (!response.ok) {
      console.error(`Spotify album fetch error ${response.status}:`, await response.text());
      return null;
    }

    const data = await response.json();
    const albumArtistNames = data.artists.map(a => a.name);

    const tracklist = data.tracks.items.map((track, index) => {
      const artists = track.artists.map(a => a.name);
      const features = artists.filter(name => !albumArtistNames.includes(name)).join(', ');

      return {
        id: index + 1,
        spotifyId: track.id,
        name: track.name,
        artists,
        duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
        isExplicit: track.explicit,
        features: features || null,
        // Spotify's 30s preview clip; null when the API does not expose one
        audio: track.preview_url || null,
        preview: track.preview_url || null,
        isPreviewClip: Boolean(track.preview_url),
        spotifyEmbed: `https://open.spotify.com/embed/track/${track.id}`
      };
    });

    const totalMs = data.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0);
    const [year, month, day] = data.release_date.split('-');

    const result = {
      spotifyAlbumId,
      albumName: data.name,
      albumArtists: albumArtistNames,
      tracklist,
      releaseDate: month ? `${parseInt(day)} ${MONTHS_AZ[month]} ${year}` : year,
      duration: `${data.total_tracks} mahnı, ${Math.round(totalMs / 60000)} dəqiqə`,
      label: data.label
    };

    writeCache(cacheKey, result, ALBUM_CACHE_TTL);
    return result;
  } catch (error) {
    console.error('Spotify album fetch error:', error);
    return null;
  }
}

// One-call resolution: explicit ID wins, otherwise search by title + artist.
export async function fetchAlbumDataForCatalogAlbum(album) {
  if (!album) return null;
  const id = album.spotifyAlbumId || await searchAlbumId(album.title, album.artist);
  if (!id) return null;
  return fetchAlbumData(id);
}
