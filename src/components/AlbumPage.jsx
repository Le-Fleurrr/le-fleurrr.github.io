import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { albums } from "./Albums.jsx";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [showAnimated, setShowAnimated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const album = albums.find(a => a.id === parseInt(albumId));
  
  // Build gallery array with cover and additional images
  const galleryImages = album ? [
    { url: showAnimated && album.animatedCover ? album.animatedCover : album.image, type: 'cover' },
    ...(album.vinylImages || []).map(url => ({ url, type: 'vinyl' })),
    ...(album.tracklistImage ? [{ url: album.tracklistImage, type: 'tracklist' }] : []),
    ...(album.featuresImage ? [{ url: album.featuresImage, type: 'features' }] : [])
  ] : [];
  
  // Determine which image to show
  const currentImage = galleryImages[selectedImage]?.url;

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

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

  const artistSlug = album.artist.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Album Cover at Top */}
          <div className="relative mb-12">
            {/* Main Image Display */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl mb-6 group">
              {currentImage && !imageError ? (
                <img 
                  src={currentImage} 
                  alt={`${album.title} ${galleryImages[selectedImage]?.type === 'cover' ? 'cover' : 'vinyl photo'}`}
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

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  {/* Left Arrow */}
                  {selectedImage > 0 && (
                    <button
                      onClick={() => {
                        setSelectedImage(selectedImage - 1);
                        setImageError(false);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Right Arrow */}
                  {selectedImage < galleryImages.length - 1 && (
                    <button
                      onClick={() => {
                        setSelectedImage(selectedImage + 1);
                        setImageError(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage + 1} / {galleryImages.length}
                  </div>
                </>
              )}

              {/* Toggle button for animated covers */}
              {album.animatedCover && !imageError && selectedImage === 0 && (
                <button
                  onClick={() => setShowAnimated(!showAnimated)}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-all"
                >
                  {showAnimated ? '📹 Animasiya' : '🖼️ Statik'}
                </button>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="relative bg-card backdrop-blur-sm p-6 rounded-lg border border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-foreground">Şəkillər ({selectedImage + 1}/{galleryImages.length})</p>
                  <div className="flex gap-2">
                   
                  </div>
                </div>
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        setImageError(false);
                      }}
                      className={`flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-3 transition-all ${
                        selectedImage === index 
                          ? 'border-primary shadow-xl scale-105 ring-2 ring-primary/50' 
                          : 'border-border hover:border-primary/50 hover:scale-102'
                      }`}
                    >
                      <img 
                        src={index === 0 && !showAnimated && album.animatedCover ? album.image : img.url}
                        alt={`${img.type === 'cover' ? 'Cover' : 'Vinyl'} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Details Overlay at Bottom Center of Cover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
              <div className="text-center">
                {album.isNew && (
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
                    YENI BURAXILIŞ
                  </span>
                )}
                
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                    {album.title}
                  </h1>
                  {album.isExplicit && (
                    <span className="text-sm font-bold px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded">
                      E
                    </span>
                  )}
                </div>
                
                <Link 
                  to={`/artist/${artistSlug}`}
                  className="text-xl md:text-2xl text-white/90 hover:text-primary transition-colors inline-block mb-4"
                >
                  {album.artist}
                </Link>
                
                <div className="flex items-center justify-center gap-3 text-sm md:text-base text-white/80">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                  <span>•</span>
                  <span className="capitalize">{album.vinylColor} Vinyl</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Purchase Section */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              {album.description}
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-4xl font-serif font-bold mb-6 text-center">{album.price} ₼</p>
              
              <div className="flex gap-4 max-w-md mx-auto">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Səbətə əlavə et
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-serif font-bold mb-4 text-center">Məhsul Haqqında</h3>
              <ul className="space-y-2 text-muted-foreground max-w-md mx-auto">
                <li>• Orijinal vinil qeyd</li>
                <li>• {album.vinylColor} rəng vinil</li>
                <li>• Yüksək keyfiyyətli audio</li>
                <li>• Sınmaz qablaşdırma ilə göndərilir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;