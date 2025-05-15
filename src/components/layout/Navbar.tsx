import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Book, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeMenu();
    // Implement actual logout functionality here
  };

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white font-poppins">PerpusDigi</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/">Beranda</NavLink>
            <NavLink to="/books">Katalog Buku</NavLink>
            {isLoggedIn && <NavLink to="/my-books">Buku Saya</NavLink>}
            {isLoggedIn && <NavLink to="/profile">Profil</NavLink>}
            
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                leftIcon={<LogOut size={16} />}
              >
                Keluar
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => {/* Implement login */}}
              >
                Masuk
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={closeMenu}>Beranda</NavLink>
            <NavLink to="/books" onClick={closeMenu}>Katalog Buku</NavLink>
            {isLoggedIn && <NavLink to="/my-books" onClick={closeMenu}>Buku Saya</NavLink>}
            {isLoggedIn && <NavLink to="/profile" onClick={closeMenu}>Profil</NavLink>}
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                className="mt-4"
                onClick={handleLogout}
                leftIcon={<LogOut size={16} />}
              >
                Keluar
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth
                className="mt-4"
                onClick={() => {/* Implement login */}}
              >
                Masuk
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};