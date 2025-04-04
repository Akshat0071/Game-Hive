
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
import { toast } from "sonner";

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    // Force a page reload to update UI state
    window.location.href = "/";
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
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gaming-gradient animate-gradient-shift bg-[length:200%_auto]">
            NEXUS
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
        {isLoggedIn && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Hi, {user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/games" className="cursor-pointer flex items-center">
                  <Gamepad className="mr-2 h-4 w-4" />
                  <span>My Games</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/leaderboard" className="cursor-pointer flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>My Scores</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gaming-primary hover:bg-gaming-primary/90" asChild>
              <Link to="/register">Sign Up</Link>
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
          {!isLoggedIn ? (
            <div className="pt-2 flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-gaming-primary hover:bg-gaming-primary/90" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Hi, {user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
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
                <Link to="/settings" className="block py-2 hover:text-primary text-sm">
                  <Settings className="inline-block mr-2 h-4 w-4" />
                  Settings
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full mt-2" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
