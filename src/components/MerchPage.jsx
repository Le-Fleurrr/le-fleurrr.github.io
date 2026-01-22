import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { merch } from "./Merch.jsx";
import { ShoppingCart, Heart } from "lucide-react";

const getArtistList = (merch) => {
  if (!merch) return [];
  if (Array.isArray(merch.artists)) return merch.artists.filter(Boolean);
  if (Array.isArray(album.artist)) return merch.artist.filter(Boolean);
  if (typeof merch.artist === "string") {
    return merch.artist.split("&").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const MerchPage = () => {
  const { merchId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [showAnimated, setShowAnimated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef(null);

  const merch = merch.find((a) => a.id === parseInt(merchId || "", 10));

  if (!merch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Merch Tapılmadı</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const artistList = getArtistList(merch);

  const galleryImages = [
    ...(merch.front || []).map((url) => ({ url, type: "front" })),
    ...(merch.back ? [{ url: merch.backImage, type: "back" }] : []),
    ...(merch.poster ? [{ url: merch.posterImage, type: "poster" }] : []),
  ];

  const currentImage = galleryImages[selectedImage]?.url;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl mb-6 group">
              {currentImage && !imageError ? (
                <img
                  src={currentImage}
                  alt={`${merch.title} ${galleryImages[selectedImage]?.type === "cover" ? "cover" : "vinyl photo"}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-card border border-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Şəkil yüklənə bilmədi</p>
                  </div>
                </div>
              )}
              {galleryImages.length > 1 && (
                <>
                  {selectedImage > 0 && (
                    <button
                      onClick={() => {
                        setSelectedImage((s) => s - 1);
                        setImageError(false);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {selectedImage < galleryImages.length - 1 && (
                    <button
                      onClick={() => {
                        setSelectedImage((s) => s + 1);
                        setImageError(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage + 1} / {galleryImages.length}
                  </div>
                </>
              )}
              {merch.animatedCover && !imageError && selectedImage === 0 && (
                <button
                  onClick={() => setShowAnimated((s) => !s)}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-all"
                >
                  {showAnimated ? "📹 Animasiya" : "🖼️ Statik"}
                </button>
              )}
            </div>
            {galleryImages.length > 1 && (
              <div className="relative bg-card backdrop-blur-sm p-6 rounded-lg border border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-foreground">Şəkillər ({selectedImage + 1}/{galleryImages.length})</p>
                </div>
                <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "thin" }}>
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        setImageError(false);
                      }}
                      className={`flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-3 transition-all ${selectedImage === index ? "border-primary shadow-xl scale-105 ring-2 ring-primary/50" : "border-border hover:border-primary/50 hover:scale-102"
                        }`}
                    >
                      <img
                        src={index === 0 && merch.animatedCover ? merch.image : img.url}
                        alt={`${img.type === "cover" ? "Cover" : "Vinyl"} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
              <div className="text-center">
                {merch.isNew && (
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
                    YENI BURAXILIŞ
                  </span>
                )}

                <div className="flex items-center justify-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">{merch.title}</h1>
                  {merch.isExplicit && (
                    <span className="text-sm font-bold px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded">E</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {artistList.map((artist, index) => {
                    const slug = String(artist)
                      .toLowerCase()
                      .replace(/,/g, '')
                      .replace(/\$/g, '')
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]/g, "");
                    return (
                      <span key={`artist-${index}`} className="flex items-center">
                        <Link
                          to={`/artist/${slug}`}
                          className="text-xl md:text-2xl text-white/90 hover:text-primary transition-colors"
                        >
                          {artist}
                        </Link>
                        {index < artistList.length - 1 && (
                          <span className="text-xl md:text-2xl text-white/90 mx-2">&</span>
                        )}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-3 text-sm md:text-base text-white/80 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">{merch.genre}</span>
                  <span>•</span>
                  <span>{merch.year}</span>
                </div>

                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/20">
            <p className="text-3xl font-serif font-bold">{merch.price} ₼</p>
            <Button
              size="default"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Səbətə əlavə et
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/90 hover:text-primary hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
  );
};

export default AlbumPage;