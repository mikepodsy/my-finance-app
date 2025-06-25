"use client";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "At least one uppercase letter").regex(/[0-9]/, "At least one number");

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      toast.success(mode === "login" ? "Logged in!" : "Registered!");
      // Optionally redirect or update UI
    } catch (e) {
      setError((e as Error).message);
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "login" ? "Login to Viper" : "Create your Viper account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">At least 8 chars, 1 uppercase, 1 number</span>
              {mode === "login" && (
                <button type="button" className="text-xs text-green-400 hover:underline">Forgot Password?</button>
              )}
            </div>
          </div>
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
          </button>
        </form>
        <div className="mt-4 text-center">
          {mode === "login" ? (
            <>
              <span className="text-gray-400">Don&apos;t have an account?</span>
              <button
                className="ml-2 text-green-400 hover:underline"
                onClick={() => { setMode("register"); setError(null); }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-400">Already have an account?</span>
              <button
                className="ml-2 text-green-400 hover:underline"
                onClick={() => { setMode("login"); setError(null); }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 