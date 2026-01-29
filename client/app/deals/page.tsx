"use client";

import { useState } from 'react';
import { useDeals } from '@/hooks/useDeals';
import { useAuth } from '@/context/AuthContext';
import DealCard from '@/components/DealCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Cloud', 'Marketing', 'Finance', 'Legal', 'HR'];

export default function Marketplace() {
  const { isAuthenticated, user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { deals, loading } = useDeals(activeCategory, searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Deals</h1>
          <p className="text-gray-400">Exclusive deals curated for high-growth startups.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-full md:w-64"
            />
          </div>
          
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="pl-10 pr-4 py-3 glass rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-full bg-transparent"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-dark-900">{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <SkeletonLoader count={6} />
        ) : deals.length > 0 ? (
          deals.map((deal) => (
            <DealCard 
              key={deal._id} 
              deal={deal} 
              isAuthenticated={isAuthenticated}
              isClaimed={user?.claims.includes(deal._id)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass rounded-3xl">
            <p className="text-gray-400">No deals found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
