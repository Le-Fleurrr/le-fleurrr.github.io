import { lazy, Suspense, useEffect } from 'react';
import { applyStoredUserSettings } from './components/applyUserSettings.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "./components/ui/Toaster";
import { Toaster as Sonner } from "./components/ui/Sonner";
import { TooltipProvider } from "./components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./components/LanguageContext.jsx";
import { FavoritesProvider } from './components/FavoritesSystem';
import { AuthProvider } from './contexts/authContext';
import { ShopifyCartProvider } from './contexts/Shopifycartcontext';
import { ProtectedRoute } from './components/ProtectedRoute';

const Index = lazy(() => import('./components/pages/Index'));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const ArtistPage = lazy(() => import('./components/ArtistPage'));
const AlbumPage = lazy(() => import('./components/AlbumPage'));
const FavoritesPage = lazy(() => import('./components/FavoritesPage'));
const AccessoriesPage = lazy(() => import('./components/pages/AccessoriesPage'));
const Collections = lazy(() => import('./components/Collections').then(m => ({ default: m.Collections })));
const MerchCollectionsPage = lazy(() => import('./components/MerchCollectionsPage').then(m => ({ default: m.MerchCollectionsPage })));
const MerchPage = lazy(() => import('./components/MerchPage').then(m => ({ default: m.MerchPage })));
const Login = lazy(() => import('./components/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./components/SignUp').then(m => ({ default: m.Signup })));
const SearchPage = lazy(() => import('./components/SearchPage').then(m => ({ default: m.SearchPage })));
const CartPage = lazy(() => import('./components/CartPage'));
const AccountPage = lazy(() => import('./components/AccountPage'));

const queryClient = new QueryClient();

const PageLoader = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">{t.loading}</p>
    </div>
  );
};

function App() {
  // Saved theme/display settings apply on every page load, not just pages
  // that render the navbar's Settings panel
  useEffect(() => {
    applyStoredUserSettings();
  }, []);

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <FavoritesProvider>
              <ShopifyCartProvider>
                <Toaster />
                <Sonner />
                <Router>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/" element={<Index />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                      <Route path="/artist/:artistName" element={<ArtistPage />} />
                      <Route path="/album/:albumId" element={<AlbumPage />} />
                      <Route path="/merch" element={<MerchCollectionsPage />} />
                      <Route path="/merch/:merchId" element={<MerchPage />} />
                      <Route path="/accessories" element={<AccessoriesPage />} />
                      <Route path="/accessories/:accessoriesId" element={<AccessoriesPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Router>
              </ShopifyCartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
