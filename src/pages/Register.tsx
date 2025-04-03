
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 cyber-bg">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
