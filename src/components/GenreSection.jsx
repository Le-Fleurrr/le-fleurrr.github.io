import { ArrowRight } from "lucide-react";

const genres = [
  { name: "Jazz", count: 1240, color: "from-amber-600/30 to-amber-900/50" },
  { name: "Rock", count: 3450, color: "from-red-600/30 to-red-900/50" },
  { name: "Electronic", count: 890, color: "from-blue-600/30 to-blue-900/50" },
  { name: "Classical", count: 670, color: "from-purple-600/30 to-purple-900/50" },
  { name: "Hip-Hop", count: 1890, color: "from-green-600/30 to-green-900/50" },
  { name: "Soul & R&B", count: 980, color: "from-pink-600/30 to-pink-900/50" },
];

export const GenreSection = () => {
  return (
    <section id="genres" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">
            Explore
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Browse by Genre
          </h2>
        </div>

        {/* Genre Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <a
              key={genre.name}
              href={`#${genre.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl p-8 min-h-[180px] flex flex-col justify-between bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-muted-foreground mt-1">{genre.count.toLocaleString()} records</p>
              </div>

              {/* Arrow */}
              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};