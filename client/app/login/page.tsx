"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      router.push("/deals");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-6">
      <div className="w-full max-w-md p-8 glass rounded-3xl border-white/5">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">
          Login to access your startup benefits.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="text-sm text-rose-500 bg-rose-500/10 p-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email Address
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="founder@example.com"
            />
            {errors.email?.message && (
              <p className="mt-1 text-sm text-rose-500">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="••••••••"
            />
            {errors.password?.message && (
              <p className="mt-1 text-sm text-rose-500">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-500 hover:bg-brand-600 transition-all text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-500 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
