"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Rocket, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-brand-500 rounded-lg group-hover:bg-brand-600 transition-colors">
            <Rocket size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">StartupPerks</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">Deals</Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-300 hover:text-white">Sign In</Link>
              <Link 
                href="/register" 
                className="px-5 py-2 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-all"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-800 border-b border-white/10 md:hidden p-6 flex flex-col gap-4"
          >
            <Link href="/deals" onClick={() => setIsOpen(false)}>Marketplace</Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-rose-400">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
