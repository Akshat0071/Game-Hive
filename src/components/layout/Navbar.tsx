
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

        {/* Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-gaming-primary hover:bg-gaming-primary/90" asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
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
          <div className="pt-2 flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="flex-1 bg-gaming-primary hover:bg-gaming-primary/90" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
