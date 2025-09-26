import { useState } from "react";
import { Link, useLocation as useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthDialog } from "./auth-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/hooks/useLocation";  // ✅ geolocation hook

export default function Header() {
  const [location] = useRoute(); // from wouter (for routing)
  const { location: userLocation, error } = useLocation(); // ✅ GPS
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user, isAuthenticated, logout, isLogoutPending } = useAuth();
  const { toast } = useToast();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/professionals", label: "Professionals" },
    { href: "/booking", label: "Book Now" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You've been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ✅ Boundaries for Kharghar
  const isInKharghar = (lat: number, lng: number) =>
    lat > 19.01 && lat < 19.06 && lng > 73.05 && lng < 73.09;

  // ✅ Handle "Use My Location"
  const handleUseLocation = () => {
    if (userLocation) {
      if (isInKharghar(userLocation.lat, userLocation.lng)) {
        toast({
          title: "✅ Location Confirmed",
          description: "You are in Kharghar.",
        });
      } else {
        setShowPopup(true);
      }
    }
  };

  const renderLocation = () => {
    if (userLocation) {
      return `${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`;
    }
    if (error) return "Location unavailable";
    return "Detecting...";
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">
                  ServiceHub
                </h1>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`transition-colors cursor-pointer ${
                      location === item.href
                        ? "text-primary font-medium"
                        : "text-slate-700 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* ✅ Dynamic location + button */}
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{renderLocation()}</span>
              <Button variant="outline" size="sm" onClick={handleUseLocation}>
                Use My Location
              </Button>
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} disabled={isLogoutPending}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLogoutPending ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setAuthDialogOpen(true)}>Login</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`block px-3 py-2 rounded-md transition-colors cursor-pointer ${
                      location === item.href
                        ? "text-primary bg-blue-50 font-medium"
                        : "text-slate-700 hover:text-primary hover:bg-slate-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sm text-slate-600 px-3 py-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{renderLocation()}</span>
              </div>
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <User className="h-4 w-4" />
                      <span>Welcome, {user?.username}</span>
                    </div>
                    <Button 
                      onClick={handleLogout} 
                      disabled={isLogoutPending}
                      variant="outline" 
                      className="w-full"
                    >
                      {isLogoutPending ? "Logging out..." : "Logout"}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setAuthDialogOpen(true)} className="w-full">Login</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🚨 Popup if outside Kharghar */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">⚠ Service Unavailable</h2>
            <p className="mt-2">Currently, services are only available in Kharghar.</p>
            <Button onClick={() => setShowPopup(false)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
}
