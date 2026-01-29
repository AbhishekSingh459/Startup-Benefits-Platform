"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  claimDeal: (dealId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage
  useEffect(() => {
  try {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem("user");
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  // REGISTER
  const register = async (data: { name: string; email: string; password: string }) => {
    await registerUser(data);
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // LOCAL CLAIM UPDATE (backend already saved it)
  const claimDeal = (dealId: string) => {
    if (!user) return;

    const updated = { ...user, claims: [...user.claims, dealId] };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        isVerified: !!user?.isVerified,
        login,
        register,
        logout,
        claimDeal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
