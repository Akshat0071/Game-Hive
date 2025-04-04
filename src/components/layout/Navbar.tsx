import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Search, X, LogOut, User, Settings, Trophy, Gamepad } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Use the AuthContext instead of localStorage
  const { user, logout } = useAuth();

  // Get user initials safely
  const getUserInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <header className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50", className)}>
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden mr-2">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        
        {/* Logo */}
        <Link to="/" className="flex items-center mr-4 space-x-2">
          <span className="text-2xl font-bold text-gaming-primary">
            GameHive 🐝
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          <Link to="/" className="text-foreground/70 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/games" className="text-foreground/70 transition-colors hover:text-foreground">
            Games
          </Link>
          <Link to="/leaderboard" className="text-foreground/70 transition-colors hover:text-foreground">
            Leaderboard
          </Link>
          <Link to="/community" className="text-foreground/70 transition-colors hover:text-foreground">
            Community
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center ml-auto mr-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search games..."
              className="w-64 pl-8 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} className="md:hidden ml-auto mr-2">
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="mr-2">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle className="mr-2" />

        {/* Auth Buttons or User Profile */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.username || "User"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile?tab=achievements" className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Achievements</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile?tab=settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search games..."
              className="w-full pl-8 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t space-y-3">
          <Link to="/" className="block py-2 hover:text-primary">
            Home
          </Link>
          <Link to="/games" className="block py-2 hover:text-primary">
            Games
          </Link>
          <Link to="/leaderboard" className="block py-2 hover:text-primary">
            Leaderboard
          </Link>
          <Link to="/community" className="block py-2 hover:text-primary">
            Community
          </Link>
          {!user ? (
            <div className="pt-2 flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-gaming-primary hover:bg-gaming-primary/90" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.username || "User"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Hi, {user?.username || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link to="/profile" className="block py-2 hover:text-primary text-sm">
                  <User className="inline-block mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link to="/games" className="block py-2 hover:text-primary text-sm">
                  <Gamepad className="inline-block mr-2 h-4 w-4" />
                  My Games
                </Link>
                <Link to="/profile?tab=achievements" className="block py-2 hover:text-primary text-sm">
                  <Trophy className="inline-block mr-2 h-4 w-4" />
                  Achievements
                </Link>
                <Link to="/profile?tab=settings" className="block py-2 hover:text-primary text-sm">
                  <Settings className="inline-block mr-2 h-4 w-4" />
                  Settings
                </Link>
                <button onClick={logout} className="block w-full text-left py-2 hover:text-primary text-sm text-red-500">
                  <LogOut className="inline-block mr-2 h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
