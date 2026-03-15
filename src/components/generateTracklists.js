const SPOTIFY_CLIENT_ID = '21d3924cf8654dd0abb91c72854ab95d';
const SPOTIFY_CLIENT_SECRET = 'e35cb04d48f3469f8c718b7e183a72f1';

const albumMappings = [
  { id: 67, name: "Spider-Man: Into the Spider-Verse", artist: "Various Artists", spotifyId: "35s58BRTGAEWztPo9WqCIs" },
  { id: 71, name: "X", artist: "Ken Carson", spotifyId: "3iBQSabXhatxvOKlo35Sya" },
  { id: 72, name: "A Great Chaos", artist: "Ken Carson", spotifyId: "6L6WCu3cwXc9XYa2zyH1y8" },
  { id: 73, name: "More Chaos", artist: "Ken Carson", spotifyId: "1qO5gHs2mJWd9Nx4dqvAMG" },
  { id: 74, name: "NO STYLIST", artist: "Destroy Lonely", spotifyId: "42f9YhQCWIlQzBvxkkV8pP" },
  { id: 75, name: "if looks could kill", artist: "Destroy Lonely", spotifyId: "4FyesJzVpA39hbYvcseO2d" },
  { id: 76, name: "LOVE LASTS FOREVER", artist: "Destroy Lonely", spotifyId: "5EEPSOqhj6xXFmXQQb0gLK" },
  { id: 77, name: "＜/3³", artist: "Destroy Lonely", spotifyId: "7oq7ILf2ntYRsAnnvFZGqT" },
  { id: 78, name: "Homixide Lifestyle", artist: "Homixide Gang", spotifyId: "3PFaHQZC8EWbhGPzGmLlNa" },
  { id: 79, name: "Pink Tape", artist: "Lil Uzi Vert", spotifyId: "7gjDAWSrFszPJRHtUvXWSN" },
  { id: 80, name: "Eternal Atake", artist: "Lil Uzi Vert", spotifyId: "6WLJDhDIbyGFoj5u0iZTmg" },
  { id: 88, name: "What You Saying / Regular", artist: "Lil Uzi Vert", spotifyId: "FIND_THIS_ID" },
  { id: 84, name: "DAMN.", artist: "Kendrick Lamar", spotifyId: "4eLPsYPBmXABThSJ821sqY" },
  { id: 85, name: "Good Kid M.A.A.D City", artist: "Kendrick Lamar", spotifyId: "3DGQ1iZ9XKUQxAUWjfC34w" },
  { id: 81, name: "Short 'N Sweet", artist: "Sabrina Carpenter", spotifyId: "1ILW5rLFAFzW5ARP09OQEg" },
  { id: 87, name: "Man's Best Friend", artist: "Sabrina Carpenter", spotifyId: "FIND_THIS_ID" },
  { id: 82, name: "BRAT", artist: "Charli xcx", spotifyId: "2lIZef4lzdvZkiiCzvPKj7" },
  { id: 86, name: "How I'm Feeling Now", artist: "Charli xcx", spotifyId: "3f1PiqKPvdSZgaYP0u4j3m" },
  { id: 83, name: "Charm", artist: "Clairo", spotifyId: "3vQEoTzNlZ4JYQm2I8LLQo" },
  { id: 89, name: "Immunity", artist: "Clairo", spotifyId: "2DDv7gTOpB3D3kDEHddP9z" }
];

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
  
  return accessToken;
}

async function getAlbumTracklist(spotifyAlbumId) {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/albums/${spotifyAlbumId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );

  const data = await response.json();
  
  const tracklist = data.tracks.items.map((track, index) => {
    const albumArtistNames = data.artists.map(a => a.name);
    const features = track.artists
      .filter(artist => !albumArtistNames.includes(artist.name))
      .map(artist => artist.name);

    const minutes = Math.floor(track.duration_ms / 60000);
    const seconds = Math.floor((track.duration_ms % 60000) / 1000);
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return {
      id: index + 1,
      name: track.name,
      duration,
      isExplicit: track.explicit,
      ...(features.length > 0 && { features: features.join(', ') }),
      spotifyEmbed: `https://open.spotify.com/embed/track/${track.id}`
    };
  });

  const totalMs = data.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0);
  const totalMinutes = Math.round(totalMs / 60000);

  const months = {
    '01': 'Yanvar', '02': 'Fevral', '03': 'Mart', '04': 'Aprel',
    '05': 'May', '06': 'İyun', '07': 'İyul', '08': 'Avqust',
    '09': 'Sentyabr', '10': 'Oktyabr', '11': 'Noyabr', '12': 'Dekabr'
  };
  
  const [year, month, day] = data.release_date.split('-');
  const releaseDate = `${parseInt(day)} ${months[month]} ${year}`;

  return {
    tracklist,
    releaseDate,
    duration: `${data.total_tracks} mahnı${data.total_tracks !== 1 ? 'lar' : ''}, ${totalMinutes} dəqiqə`,
    label: data.label
  };
}

async function generateAllTracklists() {
  console.log('Fetching tracklists from Spotify...\n');

  for (const album of albumMappings) {
    if (album.spotifyId === 'FIND_THIS_ID') {
      console.log(`⚠️  Album ID ${album.id}: "${album.name}" - Spotify ID not found, skipping...\n`);
      continue;
    }

    try {
      console.log(`Fetching: ${album.name} by ${album.artist}...`);
      const data = await getAlbumTracklist(album.spotifyId);
      
      console.log(`\n// Album ID: ${album.id}`);
      console.log('tracklist: [');
      data.tracklist.forEach(track => {
        console.log(`  { id: ${track.id}, name: "${track.name}", duration: "${track.duration}", isExplicit: ${track.isExplicit}${track.features ? `, features: "${track.features}"` : ''}, spotifyEmbed: "${track.spotifyEmbed}" },`);
      });
      console.log('],');
      console.log(`releaseDate: "${data.releaseDate}",`);
      console.log(`duration: "${data.duration}",`);
      console.log(`label: "${data.label}"`);
      console.log('\n---\n');

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching ${album.name}:`, error.message);
    }
  }
}

generateAllTracklists();