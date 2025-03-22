
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogIn, LogOut, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  // Check user's preferred theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/80">
          Maha-Mantri 👑
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors hover:text-primary/80 dark:hover:text-white/80 ${location.pathname === '/' ? 'font-medium' : ''}`}>
          🏠 Home
          </Link>
          
          {isAuthenticated ? (
            <Link to="/dashboard" className={`transition-colors hover:text-primary/80 dark:hover:text-white/80 ${location.pathname === '/dashboard' ? 'font-medium' : ''}`}>
              📊 Dashboard
            </Link>
          ) : null}
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
            {isAuthenticated ? (
              <Button 
                onClick={logout} 
                variant="outline" 
                size="sm" 
                className="btn-hover"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            ) : (
              <Link 
                to="/login" 
                className="btn-hover flex items-center px-4 py-2 rounded-md transition-colors"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="container px-4 mx-auto py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`py-2 px-4 rounded-md transition-colors ${location.pathname === '/' ? 'bg-primary/10 font-medium' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`py-2 px-4 rounded-md transition-colors ${location.pathname === '/dashboard' ? 'bg-primary/10 font-medium' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                📊 Dashboard
              </Link>
            )}
            
            {isAuthenticated ? (
              <Button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} 
                variant="outline" 
                className="w-full justify-start btn-hover"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            ) : (
              <Link 
                to="/login" 
                className="w-full justify-start btn-hover flex items-center px-4 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
