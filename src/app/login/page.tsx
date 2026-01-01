// src/app/login/page.tsx
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 text-center">
          {/* لوگو یا عنوان */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Smart City Pro
            </h1>
            <p className="text-xl text-gray-400 mt-2">London Control Center</p>
          </div>

          {/* توضیح کوتاه */}
          <p className="text-gray-300 mb-10 text-lg">
            Welcome back, Administrator
          </p>

          {/* باتن لاگین */}
          <div className="transform transition-all duration-300 hover:scale-105">
            <AuthButton />
          </div>

          {/* متن پایین */}
          <p className="text-gray-500 text-sm mt-8">
            Secure access to real-time urban monitoring dashboard
          </p>
        </div>

        {/* پس‌زمینه دکوراتیو (اختیاری اما خفن) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </div>
  );
}