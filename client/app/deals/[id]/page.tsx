"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDealById, claimDeal } from '@/lib/api';
import type { Deal } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DealDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isVerified, user, claimDeal: markClaimedOnLocal } = useAuth();
  
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<{success: boolean, ref: string} | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchDeal = async () => {
      const data = await getDealById(id as string);
      if (data) setDeal(data);
      setLoading(false);
    };
    fetchDeal();
  }, [id, isAuthenticated, router]);

  const handleClaim = async () => {
    if (!isVerified || !deal) return;
    
    setIsClaiming(true);
    try {
      const res = await claimDeal(user!.id, deal._id);
      setClaimStatus({ success: true, ref: res.refNumber });
      markClaimedOnLocal(deal._id);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setIsClaiming(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-brand-500" size={40} />
    </div>
  );
  
  if (!deal) return <div className="text-center py-20">Deal not found.</div>;

  const alreadyClaimed = user?.claims.includes(deal._id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/deals" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors">
        <ChevronLeft size={20} />
        Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white p-3">
              <img src={deal.logo} alt={deal.partnerName} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{deal.title}</h1>
              <p className="text-brand-500 font-medium">{deal.partnerName}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">About Benefit</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{deal.fullDetails}</p>
            </section>

            <section className="p-6 bg-brand-500/5 rounded-2xl border border-brand-500/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-brand-500" />
                Eligibility Requirements
              </h2>
              <p className="text-gray-400">{deal.eligibility}</p>
            </section>
          </div>
        </div>

        <div className="relative">
          <div className="p-8 glass rounded-3xl sticky top-28">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-tight">Total Benefit Value</div>
            <div className="text-4xl font-bold mb-8">{deal.value}</div>

            {claimStatus ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>Successfully claimed!</span>
                </div>
                <div className="text-sm text-gray-400">Reference: <span className="text-white font-mono">{claimStatus.ref}</span></div>
                <div className="p-4 bg-white/5 rounded-xl text-sm">
                  <strong>Instructions:</strong> {deal.instructions}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {alreadyClaimed ? (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                    <p className="text-sm font-medium">You have already claimed this benefit.</p>
                  </div>
                ) : !isVerified ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-start gap-3 text-sm">
                      <AlertCircle size={20} className="shrink-0" />
                      <span>Only verified startups can claim this offer. Complete your profile verification.</span>
                    </div>
                    <button disabled className="w-full py-4 bg-white/10 text-gray-500 rounded-2xl font-bold cursor-not-allowed">
                      Claim Locked
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleClaim}
                    disabled={isClaiming}
                    className="w-full py-4 bg-brand-500 hover:bg-brand-600 transition-all text-white rounded-2xl font-bold shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2"
                  >
                    {isClaiming ? <Loader2 className="animate-spin" /> : "Claim Benefit Now"}
                  </button>
                )}
                <div className="text-xs text-center text-gray-500">
                  By claiming, you agree to the partner's terms of service and our platform terms.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
