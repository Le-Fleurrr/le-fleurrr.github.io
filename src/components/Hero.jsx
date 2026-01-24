import { VinylRecord } from "./VinylRecord";
import { Button } from "./ui/Button.tsx";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { albums } from "./Albums.jsx";

export const Hero = () => {
  const featuredAlbum = albums.find(album => album.id === 69) || albums[0];

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-widest text-sm uppercase animate-fade-in">
                Premium Vinyl Kolleksiyası
              </p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                YENI! <br />DON TOLIVER -
                <span className="text-gradient block">OCTANE</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nadir nəşrləri, yeni buraxılışları və zamansız klassikləri kəşf edin.
                Musiqini eşitmək üçün nəzərdə tutulduğu kimi yaşayın.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <Link to="/album/69">İndi alış-veriş edin</Link>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-muted-foreground/30 hover:bg-secondary">
                <Play className="w-4 h-4" />
                Dinləmə Önizləməsi
              </Button>
            </div>

            <div className="flex gap-12 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">100+</p>
                <p className="text-sm text-muted-foreground">Vinyl</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">50+</p>
                <p className="text-sm text-muted-foreground">Nadir Preslər</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">10+</p>
                <p className="text-sm text-muted-foreground">Janrlar</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative h-96 flex items-center justify-center">
              {featuredAlbum?.image && (
                <div className="absolute inset-0 flex items-center justify-start pl-4">
                  <div className="w-80 h-80 rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={featuredAlbum.image}
                      alt={`${featuredAlbum.title} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={`absolute w-80 h-80 bg-gradient-to-br ${
                featuredAlbum?.sleeveColor ? `from-${featuredAlbum.sleeveColor}-500/20` : 'from-primary/20'
              } to-transparent rounded-lg transform -rotate-6`} />

              <div className="relative z-10 animate-float" style={{ marginLeft: "230px" }}>
                <VinylRecord 
                  size="xl" 
                  spinning={true} 
                  vinylColor={featuredAlbum?.vinylColor || "purple"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};