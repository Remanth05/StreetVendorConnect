import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, ShoppingCart, User, Bell } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-green">StreetVendor Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/suppliers" className="text-gray-700 hover:text-brand-green transition-colors">
              Find Suppliers
            </Link>
            <Link to="/group-orders" className="text-gray-700 hover:text-brand-green transition-colors">
              Group Orders
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-brand-green transition-colors">
              Dashboard
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-brand-green transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/suppliers"
                className="text-gray-700 hover:text-brand-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Suppliers
              </Link>
              <Link
                to="/group-orders"
                className="text-gray-700 hover:text-brand-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Group Orders
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-brand-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-brand-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
