'use client';

import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

/**
 * QUICK STATS — Bento Mini-Cards
 * ───────────────────────────────
 * UX DECISION: These cards fill the remaining grid cells with secondary KPIs.
 * They use a consistent layout pattern (icon + label + value + delta) for
 * rapid scanning.
 *
 * The Risk Score uses a segmented progress bar instead of a percentage
 * to provide instant comprehension of the risk/reward position.
 *
 * ENGINEERING: Staggered animations with increasing delays create a
 * "cascade reveal" effect that guides the eye through the information
 * hierarchy.
 */

interface QuickStatsProps {
  monthlyIncome: number;
  portfolioAlpha: number;
  riskScore: number;
}

export default function QuickStats({
  monthlyIncome,
  portfolioAlpha,
  riskScore,
}: QuickStatsProps) {
  const stats = [
    {
      label: 'Monthly Income',
      value: `$${(monthlyIncome / 1000).toFixed(1)}K`,
      delta: '+12.3%',
      deltaPositive: true,
      icon: Wallet,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Portfolio Alpha',
      value: `+${portfolioAlpha}%`,
      delta: 'vs Benchmark',
      deltaPositive: true,
      icon: TrendingUp,
      iconBg: 'bg-champagne/10',
      iconColor: 'text-champagne',
    },
    {
      label: 'Risk Score',
      value: `${riskScore}/10`,
      delta: 'Moderate',
      deltaPositive: true,
      icon: ShieldCheck,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      isRiskScore: true,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + index * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-border-active transition-colors duration-300"
          >
            {/* Hover glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-champagne/0 group-hover:bg-champagne/5 blur-2xl transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
                {!stat.isRiskScore && (
                  <Zap className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <p className="text-xs text-text-muted mb-1 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
              <p className="font-display text-2xl font-bold text-text-primary tabular-nums">
                {stat.value}
              </p>

              {/* Risk Score Progress Bar */}
              {stat.isRiskScore ? (
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`
                        h-1.5 flex-1 rounded-full transition-colors duration-300
                        ${i < riskScore
                          ? i < 4
                            ? 'bg-positive'
                            : i < 7
                              ? 'bg-amber-400'
                              : 'bg-negative'
                          : 'bg-surface-elevated'
                        }
                      `}
                    />
                  ))}
                </div>
              ) : (
                <p
                  className={`text-xs mt-1.5 font-medium ${
                    stat.deltaPositive ? 'text-positive' : 'text-negative'
                  }`}
                >
                  {stat.delta}
                </p>
              )}

              {/* Reveal info on hover */}
              <div className="mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  {stat.label === 'Risk Score' ? 'Target: 5.0' : 'Avg: +8.4%'}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
