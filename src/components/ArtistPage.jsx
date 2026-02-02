import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { CDDisc } from "./CDDisc.tsx";
import { CassetteTape } from "./CassetteTape.tsx";
import { Button } from "./ui/Button.tsx";
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

        <div className="relative pt-80 pb-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              {artistProfileImage && !profileError && (
                <div className="relative">
                  <img
                    src={artistProfileImage}
                    alt={artist}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-black shadow-2xl"
                    onError={() => setProfileError(true)}
                  />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2 drop-shadow-lg">
                  {artist}
                </h1>
                <p className="text-zinc-400 text-lg">
                  {artistAlbums[0]?.genre || "Music"}
                </p>
              </div>
            </div>
          </div>
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
                    src={Array.isArray(latestAlbum.image) ? latestAlbum.image[0] : latestAlbum.image}
                    alt={latestAlbum.title}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                    {latestAlbum.format === "cd" ? (
                      <CDDisc size="sm" spinning={hoveredAlbumId === latestAlbum.id} />
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