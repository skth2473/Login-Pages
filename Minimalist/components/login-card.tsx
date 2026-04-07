"use client";

import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <div
      className="
        w-full max-w-[400px] mx-auto
        animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out
      "
    >
      {/* Glassmorphism Card */}
      <div
        className="
          relative p-8 sm:p-10
          bg-card backdrop-blur-xl
          rounded-[24px]
          border border-white/60
          shadow-[0_8px_40px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.05)]
        "
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7 text-primary-foreground"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-semibold text-foreground tracking-tight mb-2 text-balance">
              Welcome back
            </h1>
            <p className="text-[15px] text-muted-foreground font-normal">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-[13px] text-muted-foreground mt-8">
            {"Don't have an account? "}
            <button
              type="button"
              className="text-accent hover:text-accent/80 font-medium transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
