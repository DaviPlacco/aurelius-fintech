'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Sparkline } from './ui/Sparkline';
import type { MarketIndex } from '@/data/mockData';

/**
 * MARKET TICKER POPOVER
 * ────────────────────
 * UX DECISION: Refactored for "Premium Frost" effect. 
 * High-density glassmorphism (3xl blur + 70% opacity) ensures 
 * that complex dashboard data underneath does not interfere with 
 * market index legibility.
 *
 * DESIGN: Elevated with deep shadows and defined borders to 
 * establish clear visual hierarchy.
 */

interface MarketTickerPopoverProps {
  index: MarketIndex;
  trendData: number[];
}

export function MarketTickerPopover({ index, trendData }: MarketTickerPopoverProps) {
  const router = useRouter();
  const isPositive = index.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={`
        absolute top-full left-0 mt-3 w-72 z-50 
        backdrop-blur-3xl bg-zinc-950/75 border border-zinc-700/50 
        shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl p-5
        overflow-hidden
      `}
    >
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.15em] font-bold">
                {index.name} Index
              </p>
              <div className="w-1 h-1 rounded-full bg-zinc-600" />
              <p className="text-[10px] text-champagne font-bold uppercase tracking-wider">Live</p>
            </div>
            <p className="text-2xl font-display font-bold text-white tracking-tight">
              {index.value}
            </p>
          </div>
          <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <Info className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <div className="flex items-end justify-between gap-6 mb-6">
          <div className="flex-1 h-12 flex items-center">
            <Sparkline 
              data={trendData} 
              color={isPositive ? '#22c55e' : '#ef4444'} 
            />
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-base font-bold tabular-nums ${isPositive ? 'text-positive' : 'text-negative'}`}>
              {isPositive ? '+' : ''}{index.change}%
            </p>
            <p className="text-[10px] text-zinc-500 font-medium uppercase mt-1">24h Vol: $4.2B</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Session High</p>
            <p className="text-xs font-semibold text-zinc-200 tabular-nums">
              {(parseFloat(index.value.replace(/,/g, '')) * 1.002).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Session Low</p>
            <p className="text-xs font-semibold text-zinc-200 tabular-nums">
              {(parseFloat(index.value.replace(/,/g, '')) * 0.998).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => router.push('/analytics')}
          className="w-full mt-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold text-zinc-300 transition-all uppercase tracking-widest cursor-pointer"
        >
          View Detailed Analytics
        </button>
      </div>
    </motion.div>
  );
}
