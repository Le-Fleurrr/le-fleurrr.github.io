import { useState } from "react";
import { VinylRecord } from "./VinylRecord.tsx";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart } from "lucide-react";
import { albums } from "./Albums.jsx";

type VinylColor = "black" | "red" | "blue" | "purple" | "green" | "orange" | "pink" | "clear";

interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  genre: string;
  year: number;
  isNew?: boolean;
  image: any;
  vinylColor: string; // Changed from VinylColor to string
  description: string;
}

export const FeaturedAlbums = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="new" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">
              Bu Həftə Yeni
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Seçilmiş Yazılar
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto border-muted-foreground/30 hover:bg-secondary">
            Bütün Kolleksiyaya Baxın
          </Button>
        </div>

        {/* Albums Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album: Album) => (
            <div
              key={album.id}
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredId(album.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* New Badge */}
              {album.isNew && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                  YENI
                </span>
              )}

              {/* Vinyl Visual with Album Art */}
              <div className="relative h-48 flex items-center justify-center mb-6">
                {/* Album cover background - FIXED POSITION */}
                {album.image && (
                  <div className="absolute inset-0 flex items-center justify-start pl-4">
                    <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl">
                      <img 
                        src={album.image} 
                        alt={`${album.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Background decorative gradient */}
                <div className="absolute w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-lg transform -rotate-6" />
                
                {/* Vinyl disc - MOVES on hover */}
                <div 
                  className={`relative transition-transform duration-500 ease-out ${
                    hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                  }`}
                  style={{ marginLeft: '20px' }}
                >
                  <VinylRecord 
                    size="md" 
                    spinning={hoveredId === album.id}
                    vinylColor={album.vinylColor as VinylColor}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-muted-foreground">{album.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                  <span>•</span>
                  <span>{album.year}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                  <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};