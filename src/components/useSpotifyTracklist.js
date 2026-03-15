import { useState, useEffect } from 'react';

const SPOTIFY_CLIENT_ID = '21d3924cf8654dd0abb91c72854ab95d';
const SPOTIFY_CLIENT_SECRET = 'e35cb04d48f3469f8c718b7e183a72f1';

async function getSpotifyToken() {

  const savedToken = localStorage.getItem('spotify_auth_token');
  const expiry = localStorage.getItem('spotify_token_expiry');

  if (savedToken && expiry && Date.now() < parseInt(expiry)) {
    return savedToken;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    });

    // Handle non-JSON errors (like the 403 text) safely
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Auth failed. Spotify says:", errorText);
      return null;
    }

    const data = await response.json();
    
    // 2. Save to localStorage to stop the reset loop
    localStorage.setItem('spotify_auth_token', data.access_token);
    localStorage.setItem('spotify_token_expiry', (Date.now() + (data.expires_in * 1000) - 60000).toString());
    
    return data.access_token;
  } catch (error) {
    console.error('Spotify auth error:', error);
    return null;
  }
}

async function fetchSpotifyTracklist(spotifyAlbumId) {
  try {
    const token = await getSpotifyToken();
    if (!token) return null;

    // 3. Use standard API URL and add market to bypass regional 403s
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${spotifyAlbumId}?market=AZ`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Fetch error ${response.status}:`, errorText);
      return null;
    }

    const data = await response.json();
    
    const tracklist = data.tracks.items.map((track, index) => {
      const albumArtistNames = data.artists.map(a => a.name);
      const features = track.artists
        .filter(artist => !albumArtistNames.includes(artist.name))
        .map(artist => artist.name)
        .join(', ');

      return {
        id: index + 1,
        name: track.name,
        duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
        isExplicit: track.explicit,
        features: features || null,
        spotifyEmbed: `https://open.spotify.com/embed/track/${track.id}`
      };
    });

    const totalMs = data.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0);
    const [year, month, day] = data.release_date.split('-');
    const months = { '01': 'Yanvar', '02': 'Fevral', '03': 'Mart', '04': 'Aprel', '05': 'May', '06': 'İyun', '07': 'İyul', '08': 'Avqust', '09': 'Sentyabr', '10': 'Oktyabr', '11': 'Noyabr', '12': 'Dekabr' };

    return {
      tracklist,
      releaseDate: `${parseInt(day)} ${months[month]} ${year}`,
      duration: `${data.total_tracks} mahnı, ${Math.round(totalMs / 60000)} dəqiqə`,
      label: data.label
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export function useSpotifyTracklist(spotifyAlbumId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spotifyAlbumId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetchSpotifyTracklist(spotifyAlbumId).then(result => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [spotifyAlbumId]);

  return { data, loading };
}