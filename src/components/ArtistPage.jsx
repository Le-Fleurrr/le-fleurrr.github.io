import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { CDDisc } from "./CDDisc.tsx";
import { Button } from "./ui/Button.tsx";
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
        <div className="absolute top-6 left-6 z-20">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
        </div>

        <div className="relative pt-32 pb-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              {artistProfileImage && !profileError && (
                <div className="relative mb-2">
                  <img
                    src={artistProfileImage}
                    alt={artist}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-black shadow-2xl"
                    onError={() => setProfileError(true)}
                  />
                </div>
              )}
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition mb-2">
                <Play fill="white" className="w-8 h-8 ml-1" />
              </div>
              
              <div className="flex-1 pb-2">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2 drop-shadow-lg">
                  {artist}
                </h1>
                <p className="text-zinc-400 text-lg">
                  {artistAlbums.reduce((sum, album) => sum + (album.tracks?.length || 10), 0)} mahnı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    src={latestAlbum.image}
                    alt={latestAlbum.title}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                    {latestAlbum.format === "cd" ? (
                      <CDDisc size="sm" spinning={hoveredAlbumId === latestAlbum.id} />
                    ) : (
                      <VinylRecord 
                        size="sm" 
                        spinning={hoveredAlbumId === latestAlbum.id}
                        vinylColor={latestAlbum.vinylColor}
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
                <p className="text-sm text-zinc-400 mt-1">{album.year}</p>
                <p className="text-sm text-zinc-500 mt-1">{album.price} ₼</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

export default ArtistPage;