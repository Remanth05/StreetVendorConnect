import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, ShoppingCart, User, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Notification, NotificationsResponse } from "@shared/api";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "./LoginModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data: NotificationsResponse = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.notifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-green">
              StreetVendor Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/suppliers"
              className="text-gray-700 hover:text-brand-green transition-colors"
            >
              Find Suppliers
            </Link>
            <Link
              to="/group-orders"
              className="text-gray-700 hover:text-brand-green transition-colors"
            >
              Group Orders
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-brand-green transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-brand-green transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Demo Button */}
            <Button
              variant="outline"
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white"
              onClick={async () => {
                try {
                  const response = await fetch("/api/demo");
                  const data = await response.json();
                  alert(`Demo API Response: ${data.message}`);
                } catch (error) {
                  console.error("Demo API failed:", error);
                  alert("Demo API failed");
                }
              }}
            >
              Demo
            </Button>

            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white relative"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                <span className="ml-2">
                  Notifications
                </span>
              </Button>

              {/* Notifications Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={async () => {
                          try {
                            await fetch("/api/notifications/mark-all-read", {
                              method: "PUT",
                            });
                            fetchNotifications();
                          } catch (error) {
                            console.error("Failed to mark all as read:", error);
                          }
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                          onClick={() => {
                            // Navigate based on notification type
                            if (notification.title.includes('Supplier')) {
                              window.location.href = '/suppliers';
                            } else if (notification.title.includes('Group Order')) {
                              window.location.href = '/group-orders';
                            } else if (notification.title.includes('Payment')) {
                              window.location.href = '/dashboard';
                            } else {
                              window.location.href = '/dashboard';
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(
                                  notification.timestamp,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      user.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <span className="text-xs px-2 py-1 bg-brand-green text-white rounded-full">
                    {user.type}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setShowLoginModal(true)}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
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
                {/* Mobile Demo Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white w-full justify-start"
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/demo");
                      const data = await response.json();
                      alert(`Demo API Response: ${data.message}`);
                    } catch (error) {
                      console.error("Demo API failed:", error);
                      alert("Demo API failed");
                    }
                  }}
                >
                  Demo
                </Button>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white w-full justify-start relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      const dropdown = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      dropdown?.classList.toggle("hidden");
                    }}
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 left-6 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                    <span className="ml-2">Notifications</span>
                  </Button>

                  {/* Mobile Notifications Dropdown */}
                  <div className="hidden mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={async () => {
                              try {
                                await fetch(
                                  "/api/notifications/mark-all-read",
                                  { method: "PUT" },
                                );
                                fetchNotifications();
                              } catch (error) {
                                console.error(
                                  "Failed to mark all as read:",
                                  error,
                                );
                              }
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-gray-500 text-sm text-center py-4">
                            No notifications
                          </p>
                        ) : (
                          notifications.slice(0, 3).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                              onClick={() => {
                                // Navigate based on notification type
                                if (notification.title.includes('Supplier')) {
                                  window.location.href = '/suppliers';
                                } else if (notification.title.includes('Group Order')) {
                                  window.location.href = '/group-orders';
                                } else if (notification.title.includes('Payment')) {
                                  window.location.href = '/dashboard';
                                } else {
                                  window.location.href = '/dashboard';
                                }
                              }}
                            >
                              <h4 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {user ? (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <img
                        src={
                          user.avatar ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        }
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user.type}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => setShowLoginModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
}
