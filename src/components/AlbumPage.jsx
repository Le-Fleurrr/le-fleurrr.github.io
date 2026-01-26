import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { albums } from "./Albums.jsx";

const getArtistList = (album) => {
  if (!album) return [];
  if (Array.isArray(album.artists)) return album.artists.filter(Boolean);
  if (Array.isArray(album.artist)) return album.artist.filter(Boolean);
  if (typeof album.artist === "string") {
    return album.artist.split("&").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [showAnimated, setShowAnimated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1); // ADD THIS LINE
  const scrollContainerRef = useRef(null);

  const album = albums.find((a) => a.id === parseInt(albumId || "", 10));

  if (!album) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Albom Tapılmadı</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const artistList = getArtistList(album);

  const galleryImages = [
    {
      url: showAnimated && album.animatedCover ? album.animatedCover : album.image,
      type: "cover",
    },
    ...(album.vinylImages || []).map((url) => ({ url, type: "vinyl" })),
    ...(album.tracklistImage ? [{ url: album.tracklistImage, type: "tracklist" }] : []),
    ...(album.featuresImage ? [{ url: album.featuresImage, type: "features" }] : []),
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
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl mb-6 group">
            {currentImage && !imageError ? (
              <img
                src={currentImage}
                alt={`${album.title} ${galleryImages[selectedImage]?.type === "cover" ? "cover" : "vinyl photo"}`}
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

            {album.animatedCover && !imageError && selectedImage === 0 && (
              <button
                onClick={() => setShowAnimated((s) => !s)}
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-all"
              >
                {showAnimated ? "📹 Animasiya" : "🖼️ Statik"}
              </button>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="relative bg-card backdrop-blur-sm p-6 rounded-lg border border-border shadow-lg mb-8">
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
                      src={index === 0 && !showAnimated && album.animatedCover ? album.image : img.url}
                      alt={`${img.type === "cover" ? "Cover" : "Vinyl"} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {album.isNew && (
              <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full">
                YENI BURAXILIŞ
              </span>
            )}

            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">{album.title}</h1>
              {album.isExplicit && (
                <span className="text-sm font-bold px-2.5 py-1 bg-muted text-muted-foreground border border-border rounded">E</span>
              )}
            </div>

            <div className="flex items-center gap-2">
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
                      className="text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors"
                    >
                      {artist}
                    </Link>
                    {index < artistList.length - 1 && (
                      <span className="text-xl md:text-2xl text-muted-foreground mx-2">&</span>
                    )}
                  </span>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
              <span className="px-3 py-1 bg-secondary rounded-lg">{album.genre}</span>
              <span>•</span>
              <span>{album.year}</span>
              {album.vinylColor && (
                <>
                  <span>•</span>
                  <span className="capitalize">{album.vinylColor} Vinyl</span>
                </>
              )}
            </div>

            {album.description && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-2">Təsvir</h3>
                <p className="text-muted-foreground">{album.description}</p>
              </div>
            )}

            {album.variants && album.variants.length > 0 && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-3">Dizayn Seçin</h3>
                <div className="grid grid-cols-4 gap-3">
                  {album.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant.id);
                        // Find the index of this variant's image in the gallery
                        const variantImageIndex = galleryImages.findIndex(img => img.url === variant.image);
                        if (variantImageIndex !== -1) {
                          setSelectedImage(variantImageIndex);
                        }
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedVariant === variant.id
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-1 text-center">
                        <p className="text-xs text-white font-medium truncate">{variant.name}</p>
                      </div>
                      {selectedVariant === variant.id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedVariant && (
                  <p className="mt-3 text-sm text-primary font-medium">
                    ✓ Seçilmiş: {album.variants.find(v => v.id === selectedVariant)?.name}
                  </p>
                )}
              </div>
            )}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-3">Miqdar</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition flex items-center justify-center"
                >
                  <span className="text-xl font-bold">-</span>
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition flex items-center justify-center"
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-4xl font-serif font-bold">{(album.price * quantity).toFixed(2)} ₼</p>
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Səbətə əlavə et
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;