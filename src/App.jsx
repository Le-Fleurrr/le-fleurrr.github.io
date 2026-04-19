import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Collections } from './components/Collections';
import { Toaster } from "./components/ui/Toaster";
import { Toaster as Sonner } from "./components/ui/Sonner";
import { TooltipProvider } from "./components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './components/pages/Index';
import NotFound from "./components/pages/NotFound";
import { LanguageProvider } from "./components/LanguageContext.jsx";
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import { MerchCollectionsPage } from './components/MerchCollectionsPage';
import { MerchPage } from "./components/MerchPage";
import { FavoritesProvider, FavoritesPage } from './components/FavoritesSystem';
import { albums } from './components/Albums';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ShopifyCartProvider } from './contexts/ShopifyCartContext';
import { SearchPage } from './components/SearchPage';

const queryClient = new QueryClient();

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <FavoritesProvider>
            <AuthProvider>
              <ShopifyCartProvider>
                <Toaster />
                <Sonner />
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Index />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/favorites" element={<FavoritesPage albums={albums} />} />
                    <Route path="/artist/:artistName" element={<ArtistPage />} />
                    <Route path="/album/:albumId" element={<AlbumPage />} />
                    <Route path="/merch" element={<MerchCollectionsPage />} />
                    <Route path="/merch/:merchId" element={<MerchPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </ShopifyCartProvider>
            </AuthProvider>
          </FavoritesProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;