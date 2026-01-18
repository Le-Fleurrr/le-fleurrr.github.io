import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { CDDisc } from "./CDDisc.tsx";
<<<<<<< HEAD
import { CassetteTape } from "./CassetteTape.tsx";
=======
>>>>>>> d1ddc53 (Alpha Build)
import { Button } from "./ui/Button.tsx";
<<<<<<< HEAD
import { ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";
import { artistProfiles } from "./ArtistProfiles.jsx";

const ArtistPage = () => {
  const { artistName } = useParams();
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredAlbumId, setHoveredAlbumId] = useState(null);

  const normalizedAlbums = albums.map(album => {
    let artistArray = [];

    if (Array.isArray(album.artist)) {
      artistArray = album.artist.filter(Boolean).map(a => String(a).trim());
    } else if (typeof album.artist === 'string') {
      artistArray = album.artist.split(/[&,]/).map(a => a.trim()).filter(Boolean);
    } else {
      artistArray = [String(album.artist)];
    }

    return {
      ...album,
      artist: artistArray
    };
  });

  const artistAlbums = normalizedAlbums.filter(album => {
    const artistNames = album.artist.map(a =>
      String(a)
        .toLowerCase()
        .replace(/,/g, '')
        .replace(/\$/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
    );
    return artistNames.includes(artistName);
  });

  let displayArtist = "Artist";
  for (const album of artistAlbums) {
    for (const artistInAlbum of album.artist) {
      const slug = String(artistInAlbum)
        .toLowerCase()
        .replace(/,/g, '')
        .replace(/\$/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      if (slug === artistName) {
        displayArtist = artistInAlbum;
        break;
      }
    }
    if (displayArtist !== "Artist") break;
  }

  const artist = displayArtist;
  const artistProfile = artistProfiles[artist] || {};

  const urlParams = new URLSearchParams(window.location.search);
  const bannerFromUrl = urlParams.get('banner');
  const profileFromUrl = urlParams.get('profile');

  const artistBanner = bannerFromUrl || artistProfile.banner;
  const artistProfileImage = profileFromUrl || artistProfile.profileImage;

  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);

=======
import { Play, MoreHorizontal, Heart, Plus, ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";
import { artistProfiles } from "./ArtistProfiles.jsx"; // Import artist profiles

const ArtistPage = () => {
  const { artistName } = useParams();
  const [hoveredAlbumId, setHoveredAlbumId] = useState(null);
  const [following, setFollowing] = useState(false);

  const artistAlbums = albums.filter(
    album => album.artist.toLowerCase().replace(/\s+/g, '-') === artistName
  );

  const artist = artistAlbums[0]?.artist || "Artist";
  
  // Get artist profile data from ArtistProfiles.jsx
  const artistProfile = artistProfiles[artist] || {};
  
  // Check URL parameters for banner and profile images
  const urlParams = new URLSearchParams(window.location.search);
  const bannerFromUrl = urlParams.get('banner');
  const profileFromUrl = urlParams.get('profile');
  
  // Priority: URL params > ArtistProfiles.jsx > fallback to gradient
  const artistBanner = bannerFromUrl || artistProfile.banner;
  const artistProfileImage = profileFromUrl || artistProfile.profileImage;
  
  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);

>>>>>>> baab95a (Alpha Build)
  if (artistAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
          <Link to="/" className="text-red-500 hover:text-red-400">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const sortedAlbums = [...artistAlbums].sort((a, b) => b.year - a.year);
  const latestAlbum = sortedAlbums[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 h-[500px] overflow-hidden">
          {artistBanner && !bannerError ? (
            <>
              <img
                src={artistBanner}
                alt={`${artist} banner`}
                className="w-full h-full object-cover"
                onError={() => setBannerError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black" />
          )}
        </div>
<<<<<<< HEAD

        <div className="absolute top-6 left-6 z-20">
          <Link to="/">
            <Button
              variant="ghost"
=======
        <div className="absolute top-6 left-6 z-20">
          <Link to="/">
            <Button 
              variant="ghost" 
>>>>>>> baab95a (Alpha Build)
              className="text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
        </div>

<<<<<<< HEAD
        <div className="relative pt-80 pb-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              {artistProfileImage && !profileError && (
                <div className="relative">
=======
        <div className="relative pt-32 pb-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              {artistProfileImage && !profileError && (
                <div className="relative mb-2">
>>>>>>> baab95a (Alpha Build)
                  <img
                    src={artistProfileImage}
                    alt={artist}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-black shadow-2xl"
                    onError={() => setProfileError(true)}
                  />
                </div>
              )}
<<<<<<< HEAD

              <div className="flex-1">
=======
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition mb-2">
                <Play fill="white" className="w-8 h-8 ml-1" />
              </div>
              
              <div className="flex-1 pb-2">
>>>>>>> baab95a (Alpha Build)
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2 drop-shadow-lg">
                  {artist}
                </h1>
                <p className="text-zinc-400 text-lg">
<<<<<<< HEAD
                  {artistAlbums[0]?.genre || "Music"}
=======
                  {artistAlbums.reduce((sum, album) => sum + (album.tracks?.length || 10), 0)} mahnı
>>>>>>> baab95a (Alpha Build)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD

=======
      <div className="px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setFollowing(!following)}
            variant={following ? "outline" : "default"}
            className={`rounded-full px-6 ${
              following 
                ? "border-zinc-600 text-zinc-400 bg-transparent hover:border-zinc-500 hover:bg-transparent" 
                : "bg-transparent border border-zinc-400 text-white hover:border-white hover:bg-transparent"
            }`}
          >
            {following ? (
              <>
                <Heart className="w-4 h-4 mr-2 fill-current" />
                İzlənir
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                İzlə
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 hover:bg-zinc-800"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
>>>>>>> baab95a (Alpha Build)
      {latestAlbum && (
        <div className="px-8 py-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Son Buraxılış</h2>
          <Link
            to={`/album/${latestAlbum.id}`}
            className="block group"
            onMouseEnter={() => setHoveredAlbumId(latestAlbum.id)}
            onMouseLeave={() => setHoveredAlbumId(null)}
          >
            <div className="flex items-center gap-6 p-4 rounded-lg hover:bg-zinc-900/50 transition-all">
              <div className="relative w-40 h-40 flex-shrink-0">
                {latestAlbum.image ? (
                  <img
<<<<<<< HEAD
                    src={Array.isArray(latestAlbum.image) ? latestAlbum.image[0] : latestAlbum.image}
=======
                    src={latestAlbum.image}
>>>>>>> baab95a (Alpha Build)
                    alt={latestAlbum.title}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                    {latestAlbum.format === "cd" ? (
                      <CDDisc size="sm" spinning={hoveredAlbumId === latestAlbum.id} />
<<<<<<< HEAD
                    ) : latestAlbum.format === "cassette" ? (
                      <CassetteTape
                        size="sm"
                        spinning={hoveredAlbumId === latestAlbum.id}
                        cassetteColor={latestAlbum.cassetteColor || "black"}
                      />
                    ) : (
                      <VinylRecord
                        size="sm"
                        spinning={hoveredAlbumId === latestAlbum.id}
                        vinylColor={latestAlbum.vinylColor || "black"}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">
                  {new Date(latestAlbum.year, 0).toLocaleDateString('az-AZ', {
                    year: 'numeric',
                  })}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold group-hover:text-red-500 transition">
                    {latestAlbum.title}
                  </h3>
                  {latestAlbum.isExplicit && (
                    <span className="text-sm font-bold px-2.5 py-1 bg-zinc-700 text-zinc-300 border border-zinc-600 rounded flex-shrink-0">
                      E
                    </span>
                  )}
<<<<<<< HEAD
=======
                  
                  <div 
                    className={`relative transition-transform duration-500 ease-out ${
                      hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                    }`}
                    style={{ marginLeft: '20px' }}
                  >
                    {album.format === "cd" ? (
                      <CDDisc 
                        size="md" 
                        spinning={hoveredId === album.id}
=======
                    ) : (
                      <VinylRecord 
                        size="sm" 
                        spinning={hoveredAlbumId === latestAlbum.id}
                        vinylColor={latestAlbum.vinylColor}
>>>>>>> baab95a (Alpha Build)
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">
                  {new Date(latestAlbum.year, 0).toLocaleDateString('az-AZ', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric' 
                  })}
                </p>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition">
                  {latestAlbum.title}
                </h3>
                <p className="text-zinc-400">
                  {latestAlbum.tracks?.length || 10} mahnı • {latestAlbum.price} ₼
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Diskografiya</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="group"
              onMouseEnter={() => setHoveredAlbumId(album.id)}
              onMouseLeave={() => setHoveredAlbumId(null)}
            >
              <div className="relative mb-4 aspect-square">
                {album.image ? (
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                    {album.format === "cd" ? (
                      <CDDisc size="md" spinning={hoveredAlbumId === album.id} />
                    ) : (
                      <VinylRecord 
                        size="md" 
                        spinning={hoveredAlbumId === album.id}
                        vinylColor={album.vinylColor}
                      />
                    )}
                  </div>
<<<<<<< HEAD
>>>>>>> d1ddc53 (Alpha Build)
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="px-8 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Diskografiya</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="group relative"
              onMouseEnter={() => setHoveredId(album.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {album.isNew && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  YENI
                </span>
              )}

              <div className="relative h-48 flex items-center justify-center mb-4">
                {album.image ? (
                  <div className="absolute inset-0 flex items-center justify-start pl-4">
                    <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl">
                      <img
                        src={Array.isArray(album.image) ? album.image[0] : album.image}
                        alt={`${album.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
<<<<<<< HEAD
=======
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                    <Button 
                      size="sm" 
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Səbətə əlavə et
                    </Button>
>>>>>>> d1ddc53 (Alpha Build)
                  </div>
                ) : null}
                <div
                  className={`relative transition-transform duration-500 ease-out ${
                    hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                  }`}
                  style={{ marginLeft: "20px" }}
                >
                  {album.format === "cd" ? (
                    <CDDisc size="md" spinning={hoveredId === album.id} />
                  ) : album.format === "cassette" ? (
                    <CassetteTape
                      size="md"
                      spinning={hoveredId === album.id}
                      cassetteColor={album.cassetteColor || "black"}
                    />
                  ) : (
                    <VinylRecord
                      size="md"
                      spinning={hoveredId === album.id}
                      vinylColor={album.vinylColor || "black"}
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white group-hover:text-red-500 transition truncate">
                    {album.title}
                  </h3>
                  {album.isExplicit && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-zinc-700 text-zinc-300 border border-zinc-600 rounded flex-shrink-0">
                      E
                    </span>
                  )}
                </div>
=======
                )}
                {album.isNew && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    YENI
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-white group-hover:text-red-500 transition truncate">
                  {album.title}
                </h3>
>>>>>>> baab95a (Alpha Build)
                <p className="text-sm text-zinc-400 mt-1">{album.year}</p>
                <p className="text-sm text-zinc-500 mt-1">{album.price} ₼</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
<<<<<<< HEAD

=======
>>>>>>> baab95a (Alpha Build)
      <div className="h-20" />
    </div>
  );
};

export default ArtistPage;