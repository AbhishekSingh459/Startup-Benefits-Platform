"use client";

import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/hooks/useDeals';
import { motion } from 'framer-motion';
import { User, Building2, CheckCircle2, Ticket, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isVerified } = useAuth();
  const { deals } = useDeals();

  const claimedDeals = deals.filter(d => user?.claims.includes(d._id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Sidebar */}
        <aside className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit">
          <div className="p-8 glass rounded-3xl border-white/5">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-2xl font-bold uppercase">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400">
                  <Building2 size={18} />
                  <span>Company</span>
                </div>
                <span className="font-medium">{user?.company || "Not set"}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle2 size={18} />
                  <span>Status</span>
                </div>
                {isVerified ? (
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-bold uppercase tracking-wider">Verified</span>
                ) : (
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-bold uppercase tracking-wider">Pending</span>
                )}
              </div>
            </div>

            {!isVerified && (
              <div className="mt-8 p-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl text-sm">
                <p className="text-brand-500 font-bold mb-1">Verify your startup</p>
                <p className="text-gray-400 mb-3">Upload your incorporation docs to unlock all premium tier benefits.</p>
                <button className="text-brand-500 font-bold hover:underline">Complete Verification →</button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <main className="flex-1 space-y-12">
          {/* Stats */}
          <section className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 glass rounded-2xl border-white/5">
              <div className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <Ticket size={16} /> Total Claims
              </div>
              <div className="text-3xl font-bold">{user?.claims.length}</div>
            </div>
            <div className="p-6 glass rounded-2xl border-white/5">
              <div className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <TrendingUp size={16} /> Savings
              </div>
              <div className="text-3xl font-bold">$12,450</div>
            </div>
            <div className="p-6 glass rounded-2xl border-white/5">
              <div className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <User size={16} /> Tier
              </div>
              <div className="text-3xl font-bold">Pro</div>
            </div>
          </section>

          {/* Claimed Deals */}
          <section>
            <h3 className="text-2xl font-bold mb-6">Claimed Benefits</h3>
            <div className="space-y-4">
              {claimedDeals.length > 0 ? (
                claimedDeals.map(deal => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={deal._id} 
                    className="p-6 glass rounded-2xl border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white p-2">
                        <img src={deal.logo} alt={deal.partnerName} />
                      </div>
                      <div>
                        <h4 className="font-bold">{deal.title}</h4>
                        <p className="text-sm text-gray-500 tracking-wider font-mono">STATUS: APPROVED</p>
                      </div>
                    </div>
                    <Link 
                      href={`/deals/${deal._id}`}
                      className="px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg text-sm transition-all"
                    >
                      View Code
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center glass rounded-3xl border-dashed border-white/10">
                  <p className="text-gray-400 mb-6">No benefits claimed yet.</p>
                  <Link href="/deals" className="text-brand-500 font-bold">Explore Marketplace</Link>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
