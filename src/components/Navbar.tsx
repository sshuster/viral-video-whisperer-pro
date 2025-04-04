
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, Video, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Video className="h-8 w-8 text-viral-purple mr-2" />
              <span className="text-xl font-bold text-foreground">
                ViralVideoWhisperer
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-viral-purple px-3 py-2">
              Home
            </Link>
            <Link to="/features" className="text-foreground hover:text-viral-purple px-3 py-2">
              Features
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-viral-purple px-3 py-2">
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="default" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>ViralVideoWhisperer</SheetTitle>
                  <SheetDescription>
                    AI-powered viral video suggestions
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  <Link 
                    to="/" 
                    className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/features" 
                    className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      <div className="pt-2 pb-3 border-t border-border">
                        <p className="px-3 text-sm text-muted-foreground">
                          Signed in as <span className="font-semibold">{user?.name}</span>
                        </p>
                      </div>
                      <Link 
                        to="/dashboard" 
                        className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {user?.role === "admin" && (
                        <Link 
                          to="/admin" 
                          className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link 
                        to="/profile" 
                        className="text-foreground hover:text-viral-purple px-3 py-2 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="mt-2"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        variant="default" 
                        onClick={() => {
                          navigate("/register");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
