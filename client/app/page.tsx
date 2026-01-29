"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Over $100k in savings unlocked this month</span>
          </div> */}
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Supercharge your startup with <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">Premium Benefits</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Get exclusive access to credits, discounts, and perks from world-leading software partners like AWS, Stripe, HubSpot, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-lg font-semibold shadow-xl shadow-brand-500/20 transition-all w-full sm:w-auto text-center"
            >
              Get Started for Free
            </Link>
            <Link 
              href="/deals" 
              className="px-10 py-4 glass hover:bg-white/10 rounded-full text-lg font-semibold transition-all w-full sm:w-auto text-center"
            >
              Browse Deals
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-32"
        >
          {[
            {
              icon: <Zap className="text-brand-500" />,
              title: "Instant Credits",
              desc: "Skip the approval queues. Claim instantly for verified startups and founders."
            },
            {
              icon: <ShieldCheck className="text-indigo-400" />,
              title: "Verified Partners",
              desc: "Every deal is direct from official partners. No coupons, just real savings."
            },
            {
              icon: <Globe className="text-emerald-400" />,
              title: "Global Reach",
              desc: "Benefits tailored for startups in 50+ countries with world-class support."
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={item} className="p-8 glass rounded-3xl border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
