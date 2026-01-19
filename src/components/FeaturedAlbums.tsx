import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { CDDisc } from "./CDDisc.tsx";
import { CassetteTape } from "./CassetteTape.tsx";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart } from "lucide-react";
import { FavoriteButton } from './FavoritesSystem';
import { albums as rawAlbums } from "./Albums.jsx";

// --- Types ---
type VinylColor = "black" | "red" | "blue" | "purple" | "green" | "orange" | "pink" | "clear" | "yellow" | "white" | "brown";
type CassetteColor = "black" | "red" | "blue" | "purple" | "green" | "orange" | "pink" | "clear" | "yellow" | "white";

interface Album {
  id: number;
  title: string;
  artist: string[];
  price: number;
  genre: string;
  year: number;
  isNew?: boolean;
  isExplicit?: boolean;
  image?: string | string[];
  format?: "vinyl" | "cd" | "cassette";
  vinylColor?: VinylColor;
  cassetteColor?: CassetteColor;
  sleeveColor?: string;
  accentColor?: string;
  description?: string;
}

// --- Helpers ---
const normalizeAlbums = (albums: any[]): Album[] =>
  albums.map((a) => {
    let normalizedFormat: "vinyl" | "cd" | "cassette" | undefined;
    if (a.format === "vinyl") normalizedFormat = "vinyl";
    else if (a.format === "cd") normalizedFormat = "cd";
    else if (a.format === "cassette" || a.format === "cassetteTape") normalizedFormat = "cassette";

    let artistArray: string[] = [];
    const rawArtist = a.artist || a.artists;
    if (Array.isArray(rawArtist)) {
      artistArray = rawArtist.filter(Boolean).map(String);
    } else if (typeof rawArtist === "string") {
      artistArray = rawArtist.split("&").map((s: string) => s.trim()).filter(Boolean);
    }

    return {
      ...a,
      format: normalizedFormat,
      artist: artistArray,
    };
  });

const getSleeveColorClass = (color?: string) => {
  const colorMap: Record<string, string> = {
    red: "from-red-500/20 to-transparent",
    blue: "from-blue-500/20 to-transparent",
    purple: "from-purple-500/20 to-transparent",
    green: "from-green-500/20 to-transparent",
    orange: "from-orange-500/20 to-transparent",
    pink: "from-pink-500/20 to-transparent",
    yellow: "from-yellow-500/20 to-transparent",
    brown: "from-amber-700/20 to-transparent",
    gray: "from-gray-500/20 to-transparent",
    default: "from-primary/20 to-transparent",
  };
  return colorMap[color || "default"] || colorMap.default;
};

const getAccentColors = (color?: string) => {
  const colorMap: Record<string, { border: string; text: string }> = {
    red: { border: "border-red-500/50", text: "group-hover:text-red-500" },
    blue: { border: "border-blue-500/50", text: "group-hover:text-blue-500" },
    purple: { border: "border-purple-500/50", text: "group-hover:text-purple-500" },
    green: { border: "border-green-500/50", text: "group-hover:text-green-500" },
    orange: { border: "border-orange-500/50", text: "group-hover:text-orange-500" },
    pink: { border: "border-pink-500/50", text: "group-hover:text-pink-500" },
    yellow: { border: "border-yellow-500/50", text: "group-hover:text-yellow-500" },
    amber: { border: "border-amber-600/50", text: "group-hover:text-amber-600" },
    gray: { border: "border-gray-500/50", text: "group-hover:text-gray-500" },
    default: { border: "border-primary/50", text: "group-hover:text-primary" },
  };
  return colorMap[color || "default"] || colorMap.default;
};

// --- Component ---
export const FeaturedAlbums = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();
  const featuredAlbums: Album[] = normalizeAlbums(rawAlbums).slice(0, 6);

  return (
    <section id="new" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">
              Bu Həftə Yeni
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Seçilmiş Yazılar
            </h2>
          </div>
          <Button
            variant="outline"
            className="self-start md:self-auto border-muted-foreground/30 hover:bg-secondary"
            asChild
          >
            <Link to="/collections">Bütün Kolleksiyaya Baxın</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAlbums.map((album) => {
            const accentColors = getAccentColors(album.accentColor);
            const coverImage = Array.isArray(album.image) ? album.image[0] : album.image;

            return (
              <div
                key={album.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/album/${album.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/album/${album.id}`);
                }}
                onMouseEnter={() => setHoveredId(album.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative bg-card rounded-xl p-6 border transition-all duration-300 cursor-pointer ${accentColors.border} hover:shadow-lg`}
              >
                {album.isNew && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                    YENİ
                  </span>
                )}

                <div className="absolute top-4 left-4 z-20">
                  <FavoriteButton albumId={album.id} size="medium" />
                </div>

                <div className="relative h-48 flex items-center justify-center mb-6">
                  {coverImage && (
                    <div className="absolute inset-0 flex items-center justify-start pl-4">
                      <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl z-10">
                        <img
                          src={coverImage}
                          alt={`${album.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className={`absolute w-40 h-40 bg-gradient-to-br ${getSleeveColorClass(
                      album.sleeveColor
                    )} rounded-lg transform -rotate-6`}
                  />

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

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-serif text-xl font-bold transition-colors ${accentColors.text}`}>
                          {album.title}
                        </h3>
                        {album.isExplicit && (
                          <span className="text-xs font-bold px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded">
                            E
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1 text-sm">
                        {album.artist.map((artistName, idx) => {
                          const slug = String(artistName)
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]/g, "");
                          return (
                            <span key={`${album.id}-art-${idx}`} className="flex items-center">
                              <Link
                                to={`/artist/${slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {artistName}
                              </Link>
                              {idx < album.artist.length - 1 && (
                                <span className="text-muted-foreground mx-1">&</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                    <span>•</span>
                    <span>{album.year}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                    <Button
                      size="sm"
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add cart logic here
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Səbətə əlavə et
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};