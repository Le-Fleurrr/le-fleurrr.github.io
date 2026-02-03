import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Collections } from './components/Collections';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './components/pages/Index';
import NotFound from "./components/pages/NotFound";
import { Account } from './components/Account';
<<<<<<< HEAD
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
=======
import { Hero } from "./components/Hero.jsx";
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import { FeaturedAlbums } from './components/FeaturedAlbums.js';
>>>>>>> 5cbb1c1 (Alpha Build)
import { Cloudinary } from '@cloudinary/url-gen';
import { MerchCollectionsPage } from './components/MerchCollectionsPage.jsx';
import { MerchPage } from "./components/MerchPage.jsx";
import { FavoritesProvider, FavoritesPage } from './components/FavoritesSystem';
import { albums } from './components/Albums';

const queryClient = new QueryClient();

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'deroy68n9' } });
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
<<<<<<< HEAD
        <Toaster />
        <Sonner />
        <Router basename='/Backrooms/'>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <Index />
                  <Hero />
                  <FeaturedAlbums />
                </div>
              } 
            />
            <Route path="/account" element={<Account />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/artist/:artistName" element={<ArtistPage />} />
            <Route path="/album/:albumId" element={<AlbumPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
=======
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/account" element={<Account />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/favorites" element={<FavoritesPage albums={albums} />} />
              <Route path="/artist/:artistName" element={<ArtistPage />} />
              <Route path="/album/:albumId" element={<AlbumPage />} />
              <Route path="/merch" element={<MerchCollectionsPage />} />
              <Route path="/merch/:merchId" element={<MerchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </FavoritesProvider>
>>>>>>> main
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;