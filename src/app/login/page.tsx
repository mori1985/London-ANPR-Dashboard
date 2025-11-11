// src/app/login/page.tsx
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">London ANPR Admin</h1>
        <AuthButton />
      </div>
    </div>
  );
}