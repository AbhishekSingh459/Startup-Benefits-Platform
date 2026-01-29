"use client";

import type { Deal } from "@/lib/types";
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface DealCardProps {
  deal: Deal;
  isAuthenticated: boolean;
  isClaimed?: boolean;
}

export default function DealCard({ deal, isAuthenticated, isClaimed }: DealCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass overflow-hidden rounded-2xl border border-white/5 card-hover relative flex flex-col h-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center">
            <img src={deal.logo} alt={deal.partnerName} className="object-contain" />
          </div>
          <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-brand-500 border border-white/10 uppercase tracking-wider">
            {deal.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{deal.description}</p>
        <div className="text-2xl font-bold text-white mb-6">{deal.value}</div>
      </div>

      <div className="mt-auto p-6 pt-0">
        {isAuthenticated ? (
          <Link 
            href={`/deals/${deal._id}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-brand-500 transition-all rounded-xl font-medium"
          >
            {isClaimed ? (
              <>
                <CheckCircle2 size={18} className="text-green-400" />
                <span>View Claimed Deal</span>
              </>
            ) : (
              <>
                <span>View Details</span>
                <ArrowRight size={18} />
              </>
            )}
          </Link>
        ) : (
          <Link 
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 transition-all rounded-xl text-gray-400 border border-dashed border-white/20"
          >
            <Lock size={16} />
            <span>Sign in to unlock</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
