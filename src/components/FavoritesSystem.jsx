import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        const result = await window.Storage.get('favorites');
        if (result && result.value) {
          setFavorites(JSON.parse(result.value));
        }
      } else {
        const stored = localStorage.getItem('favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.log('No favorites found or error loading:', error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.Storage.set('favorites', JSON.stringify(newFavorites));
      } else {
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
      try {
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      } catch (e) {
        console.error('localStorage also failed:', e);
      }
    }
  };

  const addFavorite = async (albumId) => {
    console.log('Adding favorite:', albumId);
    if (!favorites.includes(albumId)) {
      const newFavorites = [...favorites, albumId];
      await saveFavorites(newFavorites);
    }
  };

  const removeFavorite = async (albumId) => {
    console.log('Removing favorite:', albumId);
    const newFavorites = favorites.filter(id => id !== albumId);
    await saveFavorites(newFavorites);
  };

  const toggleFavorite = async (albumId) => {
    console.log('Toggling favorite:', albumId, 'Current favorites:', favorites);
    if (favorites.includes(albumId)) {
      await removeFavorite(albumId);
    } else {
      await addFavorite(albumId);
    }
  };

  const isFavorite = (albumId) => {
    return favorites.includes(albumId);
  };

  const value = {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const FavoriteButton = ({ albumId, size = "default", className = "" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('FavoriteButton clicked for album:', albumId);
    
    setIsAnimating(true);
    await toggleFavorite(albumId);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const favorited = isFavorite(albumId);
  
  console.log('FavoriteButton render - albumId:', albumId, 'favorited:', favorited);
  
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    default: "w-10 h-10",
    large: "w-12 h-12"
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    default: "w-5 h-5",
    large: "w-6 h-6"
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        favorited 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-card hover:bg-secondary border border-border text-foreground'
      } ${isAnimating ? 'scale-125' : 'scale-100'} ${className}`}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`${iconSizes[size]} transition-all ${isAnimating ? 'scale-110' : 'scale-100'}`}
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
};

export const FavoritesPage = ({ albums }) => {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Yüklənir...</p>
        </div>
      </div>
    );
  }

  const favoriteAlbums = albums.filter(album => favorites.includes(album.id));

  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Sevimlilər</h1>
          <p className="text-muted-foreground">
            {favoriteAlbums.length} albom
          </p>
        </div>

        {favoriteAlbums.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 text-muted-foreground mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Hələ sevimli yoxdur</h2>
            <p className="text-muted-foreground">
              Bəyəndiyiniz albomları sevimlilərinizə əlavə edin
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favoriteAlbums.map((album) => (
              <a
                key={album.id}
                href={`/album/${album.id}`}
                className="group relative"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-card border border-border">
                  {album.image ? (
                    <img
                      src={Array.isArray(album.image) ? album.image[0] : album.image}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <FavoriteButton albumId={album.id} size="small" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {album.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {Array.isArray(album.artist) ? album.artist.join(', ') : album.artist}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{album.year}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesProvider;