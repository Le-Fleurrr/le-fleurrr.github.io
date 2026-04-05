// src/components/UserMenu.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Settings, Package } from 'lucide-react';

export function UserMenu() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  if (!currentUser) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/login">
          <button className="px-4 py-2 text-sm font-medium hover:text-primary transition">
            Daxil ol
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition">
            Qeydiyyat
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        <span className="text-sm font-medium hidden md:block">
          {currentUser.displayName || currentUser.email}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-20">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium">{currentUser.displayName}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>

            <div className="py-2">
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition"
                onClick={() => setIsOpen(false)}
              >
                <Package className="w-4 h-4" />
                Hesabım
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition text-red-500"
              >
                <LogOut className="w-4 h-4" />
                Çıxış
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}