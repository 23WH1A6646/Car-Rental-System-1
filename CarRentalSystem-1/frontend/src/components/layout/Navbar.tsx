import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, X, Car } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const { isAuthenticated, user } = authState;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-auto text-rental-blue" />
              <span className="ml-2 text-xl font-bold text-rental-blue">CarCompass</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-rental-blue">Home</Link>
              <Link to="/cars" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-rental-blue">Browse Cars</Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-rental-blue">About Us</Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-rental-blue">Contact</Link>
            </div>
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden sm:flex sm:items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Signed in as
                    <div className="text-black font-medium truncate">{user?.email}</div>
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookings')}>
                    My Bookings
                  </DropdownMenuItem>
                  {user?.email === 'admin@gmail.com' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-rental-blue focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-4 py-2 text-base font-medium text-rental-blue">Home</Link>
            <Link to="/cars" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">Browse Cars</Link>
            <Link to="/about" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">About Us</Link>
            <Link to="/contact" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">Contact</Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">My Profile</Link>
                <Link to="/bookings" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">My Bookings</Link>
                {user?.email === 'admin@gmail.com' && (
                  <Link to="/admin" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-rental-blue">Admin</Link>
                )}
                <Button className="w-full mt-2" variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <div className="mt-4 flex flex-col space-y-2 px-4">
                <Link to="/login">
                  <Button className="w-full" variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
