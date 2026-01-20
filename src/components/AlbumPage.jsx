import { useState } from "react"; // Added missing hooks
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { 
  ArrowLeft, ShoppingCart, Star, MessageSquare, 
  ListMusic, Info, Reply 
} from "lucide-react";
import { albums } from "./Albums.jsx";
<<<<<<< HEAD
import { FavoriteButton } from './FavoritesSystem';
=======
import { ShoppingCart, Heart } from "lucide-react";
>>>>>>> d93595e (Alpha BUild)

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
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [showAnimated, setShowAnimated] = useState(true);
  
  // Interaction States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [interactions, setInteractions] = useState([]); 

  const album = albums.find(a => a.id === parseInt(albumId));

  if (!album) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Albom Tapılmadı</h1>
          <Link to="/" className="text-primary hover:underline">← Ana səhifəyə qayıt</Link>
        </div>
      </div>
    );
  }

  const artistList = getArtistList(album);
  const staticCovers = Array.isArray(album.image) ? album.image : album.image ? [album.image] : [];
  
  const galleryImages = [
    ...(album.animatedCover
      ? [{ url: showAnimated ? album.animatedCover : staticCovers[0], type: "cover" }]
      : staticCovers.length ? [{ url: staticCovers[0], type: "cover" }] : []),
    ...staticCovers.slice(album.animatedCover ? 1 : 1).map(url => ({ url, type: "cover" })),
    ...(album.vinylImages || []).map(url => ({ url, type: "vinyl" })),
    ...(Array.isArray(album.tracklistImage)
      ? album.tracklistImage.map((url) => ({ url, type: "tracklist" }))
      : album.tracklistImage ? [{ url: album.tracklistImage, type: "tracklist" }] : []),
    ...(Array.isArray(album.featuresImage)
      ? album.featuresImage.map((url) => ({ url, type: "features" }))
      : album.featuresImage ? [{ url: album.featuresImage, type: "features" }] : []),
  ];

  const handleAddReview = () => {
    if (!reviewComment.trim()) return;
    setInteractions([{
      id: Date.now(), type: 'review', user: "Alıcı", rating, comment: reviewComment, date: new Date().toLocaleDateString()
    }, ...interactions]);
    setReviewComment("");
    setRating(0);
  };

  const handleAddQuestion = () => {
    if (!questionText.trim()) return;
    setInteractions([{
      id: Date.now(), type: 'question', user: "İstifadəçi", text: questionText, replies: [], date: new Date().toLocaleDateString()
    }, ...interactions]);
    setQuestionText("");
  };

  const handleAddReply = (parentId) => {
    if (!replyText.trim()) return;
    setInteractions(prev => prev.map(item => item.id === parentId ? {
      ...item, replies: [...(item.replies || []), { id: Date.now(), user: "İstifadəçi", text: replyText, date: "İndi" }]
    } : item));
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Album Cover */}
          <div className="relative mb-8">
            <div className="aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-muted">
              {galleryImages[selectedImage]?.url && !imageError ? (
                <img 
                  src={galleryImages[selectedImage].url} 
                  alt={`${album.title} cover`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-dashed">
                  <p className="text-muted-foreground">Şəkil yüklənə bilmədi</p>
                </div>
              )}
<<<<<<< HEAD
            </div>
            
            <h1 className="text-3xl font-bold mt-4">{album.title}</h1>
            <div className="flex items-center gap-2 text-2xl text-muted-foreground">
              {artistList.map((artist, idx) => {
                const slug = String(artist).toLowerCase().replace(/\s+/g, '-');
                return (
                  <span key={idx}>
                    <Link to={`/artist/${slug}`} className="hover:text-primary transition-colors">{artist}</Link>
                    {idx < artistList.length - 1 && <span className="mx-2">&</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* TABS */}
          <div className="flex border-b border-border mb-8 overflow-x-auto">
            {[
              { id: "description", label: "Təsvir", icon: <Info className="w-4 h-4" /> },
              { id: "tracklist", label: "Mahnı Siyahısı", icon: <ListMusic className="w-4 h-4" /> },
              { id: "interactions", label: "Rəylər və Suallar", icon: <MessageSquare className="w-4 h-4" /> }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="min-h-[300px] mb-12">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary rounded-lg">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                </div>
                {album.description && <p className="text-muted-foreground">{album.description}</p>}
                
                {/* QUANTITY */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-3">Miqdar</h3>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:border-primary">-</button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:border-primary">+</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tracklist" && (
              <div className="space-y-1">
                {album.tracklist?.map((track, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-muted-foreground">{i + 1}</span>
                      <span className="font-medium">{typeof track === 'string' ? track : track.title}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{track.duration || "--:--"}</span>
                  </div>
                ))}
=======
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
                        src={index === 0 && !showAnimated && album.animatedCover ? album.image : img.url}
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
                {album.isNew && (
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
                    YENI BURAXILIŞ
                  </span>
                )}

                <div className="flex items-center justify-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">{album.title}</h1>
                  {album.isExplicit && (
                    <span className="text-sm font-bold px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded">E</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {artistList.map((artist, index) => (
                    <span key={artist} className="flex items-center">
                      <Link
                        to={`/artist/${artist.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-xl md:text-2xl text-white/90 hover:text-primary transition-colors"
                      >
                        {artist}
                      </Link>
                      {index < artistList.length - 1 && <span className="mx-1">&</span>}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3 text-sm md:text-base text-white/80">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                  {album.vinylColor && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{album.vinylColor} Vinyl</span>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                </div>
>>>>>>> d93595e (Alpha BUild)
              </div>
            )}

            {activeTab === "interactions" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
                     <h3 className="font-bold">Rəy Bildir</h3>
                     <div className="flex gap-1">
                       {[1, 2, 3, 4, 5].map((s) => (
                         <Star key={s} 
                           className={`w-5 h-5 cursor-pointer ${(hoverRating || rating) >= s ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} 
                           onClick={() => setRating(s)} 
                           onMouseEnter={() => setHoverRating(s)} 
                           onMouseLeave={() => setHoverRating(0)} 
                         />
                       ))}
                     </div>
                     <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Rəyinizi yazın..." className="w-full p-3 rounded-xl bg-background border border-border text-sm h-20 resize-none" />
                     <Button onClick={handleAddReview} className="w-full font-bold">Paylaş</Button>
                   </div>
                   {/* ... Other interaction UI ... */}
                </div>
                
                {/* List Interactions */}
                {interactions.map(item => (
                  <div key={item.id} className="p-5 rounded-xl border border-border bg-card/40">
                     <p>{item.comment || item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer/Price bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
            <p className="text-4xl font-serif font-bold">{(album.price * quantity).toFixed(2)} ₼</p>
            <div className="flex items-center gap-4">
              <FavoriteButton albumId={album.id} size="large" />
              <Button size="lg" className="h-14 font-bold px-8 bg-primary text-primary-foreground">
                <ShoppingCart className="mr-2 h-5 w-5" /> Səbətə əlavə et
              </Button>
            </div>
          </div>
          <Button
                    size="sm"
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
                    className="text-muted-foreground hover:text-primary shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;