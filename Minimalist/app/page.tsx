import { AnimatedBackground } from "@/components/animated-background";
import { LoginCard } from "@/components/login-card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <AnimatedBackground />
      <LoginCard />
    </main>
  );
}
