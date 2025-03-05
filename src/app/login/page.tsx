"use client";

import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-xs sm:max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

