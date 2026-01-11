import { VinylRecord } from "./VinylRecord";
import { Button } from "./ui/Button.tsx";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-widest text-sm uppercase animate-fade-in">
                Premium Vinyl Kolleksiyası
              </p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Ən Yeni
                <span className="text-gradient block">Bestsellerlər</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nadir nəşrləri, yeni buraxılışları və zamansız klassikləri kəşf edin.
                Musiqini eşitmək üçün nəzərdə tutulduğu kimi yaşayın.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                İndi alış-veriş edin
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-muted-foreground/30 hover:bg-secondary">
                <Play className="w-4 h-4" />
                Dinləmə Önizləməsi
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">15K+</p>
                <p className="text-sm text-muted-foreground">Vinyl</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">500+</p>
                <p className="text-sm text-muted-foreground">Nadir Preslər</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gradient">50+</p>
                <p className="text-sm text-muted-foreground">Janrlar</p>
              </div>
            </div>
          </div>


          <div className="relative flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">

              <div className="absolute -left-8 top-8 w-80 h-80 bg-card rounded-lg shadow-2xl flex items-center justify-center overflow-hidden border border-border">
                <div className="w-full h-full bg-gradient-to-br from-amber-900/50 via-blue-900/30 to-blue-600/30 flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="font-serif text-3xl font-bold">The Classics</p>
                    <p className="text-muted-foreground mt-2">Various Artists</p>
                  </div>
                </div>
              </div>


              <div className="relative z-10 animate-float">
                <VinylRecord size="xl" spinning={true} vinylColor="purple"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};