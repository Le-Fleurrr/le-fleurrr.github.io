import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart, Filter, X, ChevronRight } from "lucide-react";
import { Merch } from "./Merch.jsx";
import { artistProfiles } from "./ArtistProfiles.jsx";

export const MerchCollectionsPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [artistFilter, setArtistFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("collections");
  const navigate = useNavigate();

  const normalizedMerch = Merch.map(item => ({
    ...item,
    artist: Array.isArray(item.artist) 
      ? item.artist 
      : typeof item.artist === 'string' 
        ? item.artist.split('&').map(a => a.trim())
        : [item.artist]
  }));

  const allArtists = Array.from(
    new Set(normalizedMerch.flatMap(item => item.artist))
  ).sort();
  
  const allYears = Array.from(
    new Set(normalizedMerch.map(item => item.year))
  ).sort((a, b) => b - a);

  const artistCollections = allArtists.map(artist => {
    const artistMerch = normalizedMerch.filter(item => item.artist.includes(artist));
    const artistProfile = artistProfiles[artist] || {};
    
    return {
      artist,
      itemCount: artistMerch.length,
      image: artistProfile.profileImage || artistMerch[0]?.image,
      banner: artistProfile.banner,
      merch: artistMerch
    };
  }).filter(collection => collection.itemCount > 0);

  let filteredMerch = normalizedMerch.filter((item) => {
    const yearMatch = yearFilter === "All" || item.year.toString() === yearFilter;
    const artistMatch = artistFilter === "All" || item.artist.includes(artistFilter);
    return yearMatch && artistMatch;
  });

  if (sortOrder === "price-low") {
    filteredMerch = [...filteredMerch].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    filteredMerch = [...filteredMerch].sort((a, b) => b.price - a.price);
  } else if (sortOrder === "year-new") {
    filteredMerch = [...filteredMerch].sort((a, b) => b.year - a.year);
  } else if (sortOrder === "year-old") {
    filteredMerch = [...filteredMerch].sort((a, b) => a.year - b.year);
  }

  const clearFilters = () => {
    setArtistFilter("All");
    setYearFilter("All");
    setSortOrder("none");
  };

  const hasActiveFilters = artistFilter !== "All" || yearFilter !== "All" || sortOrder !== "none";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <Link to="/" className="text-primary hover:underline mb-4 inline-block">
            ← Ana səhifəyə qayıt
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            Merch Kolleksiyası
          </h1>
          <p className="text-muted-foreground text-lg">
            {viewMode === "collections" 
              ? `${artistCollections.length} kolleksiya`
              : `${filteredMerch.length} məhsul tapıldı`}
          </p>
        </div>

        <div className="mb-8 flex gap-4">
          <Button
            variant={viewMode === "collections" ? "default" : "outline"}
            onClick={() => setViewMode("collections")}
          >
            Kolleksiyalar
          </Button>
          <Button
            variant={viewMode === "all" ? "default" : "outline"}
            onClick={() => setViewMode("all")}
          >
            Bütün Məhsullar
          </Button>
        </div>

        {viewMode === "collections" && (
          <div className="space-y-12">
            {artistCollections.map((collection) => {
              const slug = String(collection.artist)
                .toLowerCase()
                .replace(/,/g, '')
                .replace(/\$/g, '')
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
              
              return (
                <div key={collection.artist} className="space-y-6">
                  <div 
                    className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setArtistFilter(collection.artist);
                      setViewMode("all");
                    }}
                  >
                    {collection.banner || collection.image ? (
                      <div className="absolute inset-0">
                        <img
                          src={collection.banner || collection.image}
                          alt={collection.artist}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
                    )}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight drop-shadow-2xl mb-4 uppercase">
                        {collection.artist}
                      </h2>
                      <p className="text-2xl md:text-3xl text-white/90 font-bold mb-6">
                        {collection.itemCount} məhsul
                      </p>
                      <Button
                        size="lg"
                        className="gap-2 text-lg px-8 py-6 group-hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          setArtistFilter(collection.artist);
                          setViewMode("all");
                        }}
                      >
                        Kolleksiyaya Bax
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20">
                      <p className="text-xs font-bold">EXPLICIT CONTENT</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {collection.merch.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer"
                        onClick={() => navigate(`/merch/${item.id}`)}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden border border-border mb-3 group-hover:shadow-xl transition-shadow bg-black">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm font-bold text-primary">{item.price} ₼</p>
                      </div>
                    ))}
                    {collection.merch.length > 5 && (
                      <div
                        className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center bg-card/50"
                        onClick={() => {
                          setArtistFilter(collection.artist);
                          setViewMode("all");
                        }}
                      >
                        <div className="text-center p-4">
                          <ChevronRight className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-semibold">
                            +{collection.merch.length - 5} daha
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === "all" && (
          <>
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtrlər {hasActiveFilters && `(${[artistFilter !== "All", yearFilter !== "All", sortOrder !== "none"].filter(Boolean).length})`}
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                    Təmizlə
                  </Button>
                )}
                <div className="flex flex-wrap gap-2">
                  {artistFilter !== "All" && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                      {artistFilter}
                      <button onClick={() => setArtistFilter("All")} className="hover:text-primary/80">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {yearFilter !== "All" && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                      {yearFilter}
                      <button onClick={() => setYearFilter("All")} className="hover:text-primary/80">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {showFilters && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">İfaçı</label>
                      <select
                        value={artistFilter}
                        onChange={(e) => setArtistFilter(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="All">Hamısı</option>
                        {allArtists.map((artist) => (
                          <option key={artist} value={artist}>
                            {artist}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">İl</label>
                      <select
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="All">Hamısı</option>
                        {allYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Sırala</label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="none">Standart</option>
                        <option value="price-low">Qiymət: Azdan Çoxa</option>
                        <option value="price-high">Qiymət: Çoxdan Aza</option>
                        <option value="year-new">İl: Yenidən Köhnəyə</option>
                        <option value="year-old">İl: Köhnədən Yeniyə</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {filteredMerch.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">Heç bir məhsul tapılmadı</p>
                <Button onClick={clearFilters} className="mt-4">
                  Filtrləri Təmizlə
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMerch.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => navigate(`/merch/${item.id}`)}
                  >
                    <div className="relative mb-4 aspect-square bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      {item.isNew && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                          YENI
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-primary transition truncate mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {item.artist.join(" & ")}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{item.year}</p>
                        <p className="font-bold text-primary">{item.price} ₼</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};