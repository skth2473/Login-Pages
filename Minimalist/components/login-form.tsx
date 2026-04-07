"use client";

import { useState } from "react";
import { Apple, Chrome } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[13px] font-medium text-foreground/80 tracking-tight"
        >
          Email
        </label>
        <div
          className={`
            relative transition-all duration-200 ease-out
            ${focusedField === "email" ? "scale-[1.01]" : "scale-100"}
          `}
        >
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="name@example.com"
            className={`
              w-full px-4 py-3.5 rounded-xl
              bg-secondary/50 backdrop-blur-sm
              border transition-all duration-200 ease-out
              text-[15px] text-foreground placeholder:text-muted-foreground/50
              outline-none
              ${
                focusedField === "email"
                  ? "border-accent/50 shadow-[0_0_0_3px_rgba(0,122,255,0.1)] bg-white"
                  : "border-border/50 hover:border-border"
              }
            `}
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-[13px] font-medium text-foreground/80 tracking-tight"
          >
            Password
          </label>
          <button
            type="button"
            className="text-[13px] text-accent hover:text-accent/80 transition-colors duration-200 font-medium"
          >
            Forgot password?
          </button>
        </div>
        <div
          className={`
            relative transition-all duration-200 ease-out
            ${focusedField === "password" ? "scale-[1.01]" : "scale-100"}
          `}
        >
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter your password"
            className={`
              w-full px-4 py-3.5 rounded-xl
              bg-secondary/50 backdrop-blur-sm
              border transition-all duration-200 ease-out
              text-[15px] text-foreground placeholder:text-muted-foreground/50
              outline-none
              ${
                focusedField === "password"
                  ? "border-accent/50 shadow-[0_0_0_3px_rgba(0,122,255,0.1)] bg-white"
                  : "border-border/50 hover:border-border"
              }
            `}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-3.5 px-6 rounded-xl
          bg-primary text-primary-foreground
          font-semibold text-[15px] tracking-tight
          transition-all duration-200 ease-out
          hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5
          active:scale-[0.98] active:shadow-md
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
          relative overflow-hidden
        `}
      >
        <span
          className={`
            flex items-center justify-center gap-2
            transition-all duration-200
            ${isLoading ? "opacity-0" : "opacity-100"}
          `}
        >
          Continue
        </span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-primary-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
      </button>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-4 text-[13px] text-muted-foreground font-medium">
            or
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="
            w-full py-3.5 px-6 rounded-xl
            bg-white border border-border/60
            font-medium text-[15px] text-foreground tracking-tight
            transition-all duration-200 ease-out
            hover:bg-secondary/50 hover:border-border hover:-translate-y-0.5 hover:shadow-md
            active:scale-[0.98]
            flex items-center justify-center gap-3
          "
        >
          <Apple className="w-5 h-5" />
          Continue with Apple
        </button>

        <button
          type="button"
          className="
            w-full py-3.5 px-6 rounded-xl
            bg-white border border-border/60
            font-medium text-[15px] text-foreground tracking-tight
            transition-all duration-200 ease-out
            hover:bg-secondary/50 hover:border-border hover:-translate-y-0.5 hover:shadow-md
            active:scale-[0.98]
            flex items-center justify-center gap-3
          "
        >
          <Chrome className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </form>
  );
}
