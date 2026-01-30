import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Music, User, Disc } from "lucide-react";

export const SearchEngine = ({ albums }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState({ albums: [], artists: [] });
  const searchRef = useRef(null);

  const getUniqueArtists = () => {
    const artistSet = new Set();
    albums.forEach(album => {
      const artistArray = Array.isArray(album.artist) 
        ? album.artist 
        : typeof album.artist === 'string' 
        ? album.artist.split(/[&,]/).map(a => a.trim())
        : [album.artist];
      
      artistArray.forEach(artist => {
        if (artist) artistSet.add(String(artist).trim());
      });
    });
    return Array.from(artistSet);
  };

  const allArtists = getUniqueArtists();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults({ albums: [], artists: [] });
      return;
    }

    const query = searchQuery.toLowerCase();

    const albumResults = albums.filter(album => 
      album.title.toLowerCase().includes(query) ||
      (Array.isArray(album.artist) 
        ? album.artist.some(a => String(a).toLowerCase().includes(query))
        : String(album.artist).toLowerCase().includes(query)) ||
      album.genre?.toLowerCase().includes(query) ||
      String(album.year).includes(query)
    ).slice(0, 5);

    const artistResults = allArtists.filter(artist =>
      artist.toLowerCase().includes(query)
    ).slice(0, 5);

    setResults({ albums: albumResults, artists: artistResults });
  }, [searchQuery, albums]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getArtistSlug = (artist) => {
    return String(artist)
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/\$/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults({ albums: [], artists: [] });
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Albom, artist və ya janr axtar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (results.albums.length > 0 || results.artists.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
          {results.artists.length > 0 && (
            <div className="p-3 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Artistlər
              </h3>
              {results.artists.map((artist, index) => (
                <Link
                  key={`artist-${index}`}
                  to={`/artist/${getArtistSlug(artist)}`}
                  className="block px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="font-medium text-foreground">{artist}</p>
                </Link>
              ))}
            </div>
          )}

          {results.albums.length > 0 && (
            <div className="p-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                <Disc className="w-4 h-4" />
                Albomlar
              </h3>
              {results.albums.map((album) => (
                <Link
                  key={album.id}
                  to={`/album/${album.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  {album.image ? (
                    <img
                      src={Array.isArray(album.image) ? album.image[0] : album.image}
                      alt={album.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                      <Music className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {album.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {Array.isArray(album.artist) ? album.artist.join(', ') : album.artist}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground flex-shrink-0">
                    {album.year}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {isOpen && searchQuery && results.albums.length === 0 && results.artists.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-2xl p-8 text-center z-50">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium mb-1">Nəticə tapılmadı</p>
          <p className="text-sm text-muted-foreground">
            "{searchQuery}" üçün heç bir nəticə tapılmadı
          </p>
        </div>
      )}
    </div>
  );
};

export const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-foreground hover:bg-secondary p-2 rounded-lg transition-colors"
      aria-label="Search"
    >
      <Search className="w-5 h-5" />
    </button>
  );
};