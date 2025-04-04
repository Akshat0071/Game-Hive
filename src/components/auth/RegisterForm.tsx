
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error("You must accept the terms and privacy policy");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration - in a real app, this would connect to your authentication service
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/games");
      // In a real app, you would store auth token and user info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        name: username,
        email,
        avatar: `https://avatar.vercel.sh/${username}`,
      }));
    }, 1500);
  };

  const handleSocialSignup = (provider: string) => {
    toast.success(`Signing up with ${provider}...`);
    // In a real app, you would redirect to OAuth provider
    setTimeout(() => {
      navigate("/games");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        name: provider + "User",
        email: provider.toLowerCase() + "user@example.com",
        avatar: `https://avatar.vercel.sh/${provider}`,
      }));
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg neon-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create your account</CardTitle>
        <CardDescription className="text-center">
          Join thousands of gamers playing free online games
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="w-full" onClick={() => handleSocialSignup("Github")}>
            <Github className="h-5 w-5 mr-2" />
            Github
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleSocialSignup("Discord")}>
            <MessageSquare className="h-5 w-5 mr-2" />
            Discord
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleSocialSignup("Google")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 mr-2">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Google
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-gaming-primary hover:text-gaming-primary/90">
                terms of service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-gaming-primary hover:text-gaming-primary/90">
                privacy policy
              </Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gaming-primary hover:bg-gaming-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-gaming-primary hover:text-gaming-primary/90 font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
