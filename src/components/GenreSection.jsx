import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { albums } from "./Albums.jsx";
import { useLanguage } from "./LanguageContext.jsx";

const GRADIENTS = [
  "from-amber-600/30 to-amber-900/50",
  "from-red-600/30 to-red-900/50",
  "from-blue-600/30 to-blue-900/50",
  "from-purple-600/30 to-purple-900/50",
  "from-green-600/30 to-green-900/50",
  "from-pink-600/30 to-pink-900/50",
];

// Real genres with real counts, computed from the catalog
const genreCounts = albums.reduce((acc, album) => {
  if (album.genre) acc[album.genre] = (acc[album.genre] || 0) + 1;
  return acc;
}, {});

const genres = Object.entries(genreCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 6)
  .map(([name, count], i) => ({ name, count, color: GRADIENTS[i % GRADIENTS.length] }));

export const GenreSection = () => {
  const { t } = useLanguage();
  return (
    <section id="genres" className="py-24">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-2">
            {t.explore}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            {t.browseByGenre}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={`/search?genre=${encodeURIComponent(genre.name)}`}
              className="group relative overflow-hidden rounded-xl p-8 min-h-[180px] flex flex-col justify-between bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-muted-foreground mt-1">{genre.count} {t.recordsWord}</p>
              </div>

              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
