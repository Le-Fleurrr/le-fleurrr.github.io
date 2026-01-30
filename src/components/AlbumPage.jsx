import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, 
  Star, MessageSquare, ListMusic, Info, Reply 
} from "lucide-react";
import { albums } from "./Albums.jsx";
import { FavoriteButton } from './FavoritesSystem';

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
  
  // UI States
  const [imageError, setImageError] = useState(false);
  const [showAnimated, setShowAnimated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Interaction States
  const [interactions, setInteractions] = useState([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const album = albums.find((a) => a.id === parseInt(albumId || "", 10));

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
  ];

  const currentImage = galleryImages[selectedImage]?.url;

  // Handlers
  const handleAddReview = () => {
    if (!reviewComment.trim()) return;
    setInteractions([{
      id: Date.now(), type: 'review', user: "Alıcı", rating, comment: reviewComment, date: new Date().toLocaleDateString()
    }, ...interactions]);
    setReviewComment("");
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
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* IMAGE SECTION */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl mb-6 group bg-card border border-border">
            {currentImage && !imageError ? (
              <img src={currentImage} alt={album.title} className="w-full h-full object-cover transition-opacity duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">Şəkil yüklənmədi</div>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono z-20">
              {selectedImage + 1} / {galleryImages.length}
            </div>

            {selectedImage > 0 && (
              <button onClick={() => setSelectedImage(s => s - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all z-10"><ChevronLeft /></button>
            )}
            {selectedImage < galleryImages.length - 1 && (
              <button onClick={() => setSelectedImage(s => s + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all z-10"><ChevronRight /></button>
            )}

            {album.animatedCover && selectedImage === 0 && (
              <button onClick={() => setShowAnimated(!showAnimated)} className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-all z-20">
                {showAnimated ? "📹 Animasiya" : "🖼️ Statik"}
              </button>
            )}
          </div>

          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-5xl font-serif font-bold tracking-tight">{album.title}</h1>
              {album.isExplicit && (
                <span className="bg-red-500/10 text-white-500 border border-red-500/20 px-2 py-1 rounded text-xs font-bold self-center">E</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-2xl text-muted-foreground">
              {artistList.map((artist, idx) => (
                <span key={idx}>
                  <Link to={`/artist/${artist.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors">{artist}</Link>
                  {idx < artistList.length - 1 && <span className="mx-2">&</span>}
                </span>
              ))}
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
                className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="min-h-[300px] mb-12">
            {activeTab === "description" && <p className="text-lg text-muted-foreground italic leading-relaxed">{album.description || "Təsvir yoxdur."}</p>}

            {activeTab === "tracklist" && (
              <div className="space-y-1">
                {album.tracklist?.map((track, i) => {
                  const isTrackExplicit = typeof track === 'object' ? (track.explicit || track.isExplicit) : false;
                  const trackTitle = typeof track === 'object' ? (track.title || track.name) : track;
                  return (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-muted-foreground w-6">{i + 1}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{trackTitle}</span>
                          {isTrackExplicit && <span className="text-[10px] font-bold px-1.5 py-0.5 bg-muted text-muted-foreground border border-border rounded">E</span>}
                        </div>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{track.duration || "--:--"}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "interactions" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
                    <h3 className="font-bold">Rəy Bildir</h3>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-5 h-5 cursor-pointer ${ (hoverRating || rating) >= s ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} onClick={() => setRating(s)} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} />
                      ))}
                    </div>
                    <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Rəyinizi yazın..." className="w-full p-3 rounded-xl bg-background border border-border text-sm h-20 resize-none" />
                    <Button onClick={handleAddReview} className="w-full font-bold">Paylaş</Button>
                  </div>
                  <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
                    <h3 className="font-bold">Sual Ver</h3>
                    <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Sualınızı yazın..." className="w-full p-3 rounded-xl bg-background border border-border text-sm h-20 resize-none" />
                    <Button variant="secondary" onClick={handleAddQuestion} className="w-full font-bold">Sualı Göndər</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {interactions.map((item) => (
                    <div key={item.id} className="p-5 rounded-xl border border-border bg-card/40">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold uppercase tracking-tighter text-primary">{item.type}</span>
                        <span className="text-muted-foreground">{item.date}</span>
                      </div>
                      
                      {item.type === 'review' ? (
                        <div className="space-y-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />
                            ))}
                          </div>
                          <p className="italic text-muted-foreground">"{item.comment}"</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="font-medium">{item.text}</p>
                          {item.replies?.map(r => (
                            <div key={r.id} className="ml-6 border-l-2 border-primary/20 pl-4 text-sm">
                              <span className="font-bold text-primary">{r.user}:</span> {r.text}
                            </div>
                          ))}
                          {replyingTo === item.id ? (
                            <div className="flex gap-2 mt-2">
                              <input value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1 bg-background border rounded-lg px-3 text-sm" placeholder="Cavabınız..." />
                              <Button size="sm" onClick={() => handleAddReply(item.id)}>Göndər</Button>
                            </div>
                          ) : (
                            <button onClick={() => setReplyingTo(item.id)} className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"><Reply className="w-3 h-3" /> Cavabla</button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BUY BAR */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="text-center sm:text-left">
              <p className="text-4xl font-serif font-bold">{(album.price * quantity).toFixed(2)} ₼</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-muted/50 p-1 rounded-xl border border-border">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 font-bold hover:text-primary transition-colors text-xl">-</button>
                <span className="font-bold text-lg px-2 w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 font-bold hover:text-primary transition-colors text-xl">+</button>
              </div>
              <div className="flex items-center gap-4">
                <FavoriteButton albumId={album.id} size="large" />
                <Button size="lg" className="h-14 font-bold px-8 shadow-xl shadow-primary/20 bg-primary text-primary-foreground">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Səbətə əlavə et
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