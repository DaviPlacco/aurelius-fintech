'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

/**
 * NET WORTH CARD — The Hero Component
 * ────────────────────────────────────
 * UX DECISION: This is the single most important data point on the dashboard.
 * It occupies the largest card in the Bento Grid and uses the champagne gold
 * accent to create visual hierarchy.
 *
 * The count-up animation serves a psychological purpose: it creates a "reveal"
 * moment that makes the number feel earned and substantial, rather than just
 * static text. This is a deliberate engagement pattern used by premium fintechs.
 *
 * ENGINEERING: The counter uses requestAnimationFrame for 60fps smoothness,
 * with an ease-out curve that decelerates naturally — mimicking physical inertia.
 */

interface NetWorthCardProps {
  totalNetWorth: number;
  monthlyReturn: number;
  ytdReturn: number;
}

function useCountUp(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for organic deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration]);

  return current;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function NetWorthCard({
  totalNetWorth,
  monthlyReturn,
  ytdReturn,
}: NetWorthCardProps) {
  const displayValue = useCountUp(totalNetWorth, 2500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="glass rounded-2xl p-6 lg:p-8 relative overflow-hidden group glow-champagne"
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Background glow orb */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-champagne/5 blur-3xl pointer-events-none group-hover:bg-champagne/8 transition-colors duration-700" />

      <div className="relative z-10">
        {/* Label */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-champagne flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-zinc-900" />
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest font-medium">
                Total Net Worth
              </p>
            </div>
          </div>
          <span className="text-xs text-champagne bg-champagne/10 px-2 py-1 rounded-full font-medium">
            Live
          </span>
        </div>

        {/* Main Value — Count-up animation */}
        <div className="mb-6">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-text-primary tabular-nums tracking-tight">
            {formatCurrency(displayValue)}
          </h2>
        </div>

        {/* Performance Metrics */}
        <div className="flex items-center gap-6 group-hover:translate-y-[-10px] transition-transform duration-300">
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-positive" />
            <span className="text-sm font-semibold text-positive tabular-nums">
              +{monthlyReturn}%
            </span>
            <span className="text-xs text-text-muted">this month</span>
          </div>
          <div className="w-px h-4 bg-border-subtle" />
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-positive" />
            <span className="text-sm font-semibold text-positive tabular-nums">
              +{ytdReturn}%
            </span>
            <span className="text-xs text-text-muted">YTD</span>
          </div>
        </div>

        {/* Comparison Reveal on Hover */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
           <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Benchmark Comparison</p>
              <p className="text-[10px] text-positive font-bold">+2.1% vs S&P 500</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
