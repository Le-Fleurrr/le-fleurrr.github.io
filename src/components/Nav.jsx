import { useState } from "react";
import { Link } from "react-router-dom";
import { useShopifyCart } from "../contexts/Shopifycartcontext";
import { CartSidebar } from "./CartSidebar";

import { Button } from "./ui/Button";
import { Search, ShoppingBag, Heart, Settings as SettingsIcon, Menu, X } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { Settings } from "./Settings";
import { SearchEngine } from "./SearchEngine";
import { useFavorites } from "./FavoritesSystem";
import { useLanguage } from "./LanguageContext.jsx";

export const Nav = ({ albums }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { cartCount } = useShopifyCart();
  const { t } = useLanguage();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { name: t.navNew, href: "#new" },
    { name: t.navGenres, href: "#genres" },
    { name: t.navOrders, href: "#orders" },
    { name: t.navAbout, href: "#about" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Backrooms</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              {/* Search toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={() => setShowSearch(!showSearch)}
                aria-label={t.searchPlaceholderShort}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground relative"
                onClick={() => setCartOpen(true)}
                aria-label={t.cart}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Favorites */}
              <Button variant="ghost" size="icon" className="text-foreground relative" asChild>
                <Link to="/favorites" aria-label={t.favoritesTitle}>
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                </Link>
              </Button>

              {/* Settings */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="text-foreground"
                aria-label={t.settings}
              >
                <SettingsIcon className="w-5 h-5" />
              </Button>

              {/* User menu */}
              <UserMenu />

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          {showSearch && (
            <div className="py-4 border-t border-border">
              <SearchEngine albums={albums} />
            </div>
          )}

          {/* Mobile nav links */}
          {isOpen && (
            <div className="md:hidden py-6 border-t border-border">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};
