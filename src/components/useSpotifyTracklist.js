import { useState, useEffect } from 'react';
import { fetchAlbumDataForCatalogAlbum } from './spotifyClient.js';

// Pulls an album's tracklist straight from Spotify: track order, titles, durations,
// artists/features, explicit flags and 30s preview audio. Accepts the catalog album
// object — an explicit album.spotifyAlbumId wins, otherwise the album is resolved
// automatically by searching Spotify with its title and artist.
export function useSpotifyTracklist(album) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const albumKey = album ? `${album.id}|${album.spotifyAlbumId || ''}|${album.title || ''}` : null;

  useEffect(() => {
    if (!album) {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetchAlbumDataForCatalogAlbum(album).then(result => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumKey]);

  return { data, loading };
}
