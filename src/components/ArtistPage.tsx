import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { CDDisc } from "./CDDisc.tsx";
import { CassetteTape } from "./CassetteTape.tsx";
import { Button } from "./ui/Button.tsx";
import { MoreHorizontal, Heart, Plus, ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";
import { artistProfiles } from "./ArtistProfiles.jsx";

interface Album {
  id: string | number;
  title: string;
  artist: string | string[];
  year: number;
  price: number;
  format?: string;
  image?: any;
  isNew?: boolean;
  vinylColor?: string;
  cassetteColor?: string;
  genre?: string;
}

const ArtistPage = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const [hoveredAlbumId, setHoveredAlbumId] = useState<string | number | null>(null);
  const [following, setFollowing] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);

  const artistAlbums = useMemo(() => {
    const normalized = (albums as unknown as Album[]).map(album => {
      let artistArray: string[] = [];

      if (Array.isArray(album.artist)) {
        artistArray = album.artist.filter(Boolean).map(a => String(a).trim());
      } else if (typeof album.artist === 'string') {
        artistArray = (album.artist as string).split(/[&,]/).map(a => a.trim()).filter(Boolean);
      } else {
        artistArray = [String(album.artist)];
      }
      
      return { ...album, artist: artistArray };
    });

    return normalized.filter(album => {
      const slugs = album.artist.map(a =>
        String(a).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      );
      return slugs.includes(artistName || "");
    });
  }, [artistName]);

  if (artistAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
          <Link to="/" className="text-red-500 hover:text-red-400">← Ana səhifəyə qayıt</Link>
        </div>
      </div>
    );
  }

  const displayArtist = artistAlbums[0]?.artist[0] || "Artist";
  const artistProfile = (artistProfiles as any)[displayArtist] || {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const artistBanner = urlParams.get('banner') || artistProfile.banner;
  const artistProfileImage = urlParams.get('profile') || artistProfile.profileImage;

  const sortedAlbums = [...artistAlbums].sort((a, b) => b.year - a.year);
  const latestAlbum = sortedAlbums[0];

  const renderMedia = (album: any, size: "sm" | "md") => {
    const isHovered = hoveredAlbumId === album.id;
    if (album.format === "cd") return <CDDisc size={size} spinning={isHovered} />;
    if (album.format === "cassette") return <CassetteTape size={size} spinning={isHovered} cassetteColor={album.cassetteColor || "black"} />;
    return <VinylRecord size={size} spinning={isHovered} vinylColor={album.vinylColor || "black"} />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 h-[500px] overflow-hidden">
          {artistBanner && !bannerError ? (
            <>
              <img 
                src={artistBanner} 
                className="w-full h-full object-cover" 
                onError={() => setBannerError(true)} 
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-black" />
          )}
        </div>

        <div className="absolute top-6 left-6 z-20">
          <Link to="/">
            <Button variant="ghost" className="text-white/90 hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Geri
            </Button>
          </Link>
        </div>

        <div className="relative pt-80 pb-8 px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            {artistProfileImage && !profileError && (
              <img
                src={artistProfileImage}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-black shadow-2xl"
                onError={() => setProfileError(true)}
                alt=""
              />
            )}
            <div className="flex-1">
              <h1 className="text-6xl md:text-8xl font-bold mb-2 drop-shadow-lg">{displayArtist}</h1>
              <p className="text-zinc-400 text-lg">{latestAlbum.genre || "Music"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 max-w-7xl mx-auto flex gap-3">
        <Button 
          onClick={() => setFollowing(!following)}
          className={`rounded-full px-6 border ${following ? "text-zinc-400 border-zinc-600" : "text-white border-zinc-400"}`}
        >
          {following ? <><Heart className="w-4 h-4 mr-2 fill-current" /> İzlənir</> : <><Plus className="w-4 h-4 mr-2" /> İzlə</>}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Diskografiya</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sortedAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="group"
              onMouseEnter={() => setHoveredAlbumId(album.id)}
              onMouseLeave={() => setHoveredAlbumId(null)}
            >
              <div className="relative aspect-square mb-4 bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden">
                {album.image?.cover ? (
                  <img src={album.image.cover} alt={album.title} className="w-full h-full object-cover rounded-lg group-hover:opacity-40 transition-opacity" />
                ) : (
                  album.image && typeof album.image === 'string' ? (
                    <img src={album.image} alt={album.title} className="w-full h-full object-cover rounded-lg group-hover:opacity-40 transition-opacity" />
                  ) : renderMedia(album, "md")
                )}
                
                {album.isNew && (
                  <span className="absolute top-2 right-2 bg-red-600 text-xs font-bold px-2 py-1 rounded">YENİ</span>
                )}
              </div>
              <h3 className="font-semibold truncate group-hover:text-red-500 transition">{album.title}</h3>
              <p className="text-sm text-zinc-500">{album.year} • {album.price} ₼</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

export default ArtistPage;