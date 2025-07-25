import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-brand-green">
                StreetVendor Connect
              </span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting street food vendors with trusted local suppliers for
              affordable, quality raw materials. Building stronger communities
              through better food supply chains.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-brand-green cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-brand-green cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-brand-green cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/suppliers"
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Find Suppliers
                </Link>
              </li>
              <li>
                <Link
                  to="/group-orders"
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Group Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-green" />
                <span className="text-gray-300">
                  support@streetvendorconnect.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-green" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-green" />
                <span className="text-gray-300">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 StreetVendor Connect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-brand-green text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-brand-green text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
