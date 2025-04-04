import { SignUpForm } from "@/components/auth/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

export function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
} 