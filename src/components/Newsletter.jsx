import { Button } from "./ui/Button";
import { VinylRecord } from "./VinylRecord";

export const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-card to-secondary" />
      
      {/* Decorative vinyls */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-20">
        <VinylRecord size="xl" spinning />
      </div>
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-20">
        <VinylRecord size="xl" spinning />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">
            Stay in the Loop
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Join the Groove Club
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get exclusive access to new releases, rare finds, and special discounts. 
            No spam, just pure vinyl love.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border h-12 px-4 rounded-md focus:border-primary"
            />
            <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            Join 10,000+ vinyl enthusiasts already in the club
          </p>
        </div>
      </div>
    </section>
  );
};
