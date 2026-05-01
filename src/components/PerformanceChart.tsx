'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PortfolioDataPoint } from '@/data/mockData';

/**
 * PERFORMANCE CHART
 * ─────────────────
 * UX DECISION: Area chart (not line) with gradient fill. The filled area
 * creates a visual "mass" that psychologically represents accumulated wealth.
 * A simple line would feel too volatile and fragile.
 *
 * The benchmark overlay (dashed, muted) allows comparison without competing
 * for visual attention — it serves as context, not the primary story.
 *
 * Period selectors use pill-style toggles instead of dropdowns to reduce
 * interaction cost (one tap vs two taps).
 */

const periods = ['1M', '3M', '6M', '1Y', 'ALL'] as const;

interface PerformanceChartProps {
  data: PortfolioDataPoint[];
}

// Custom tooltip with glassmorphism
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;

  return (
    <div className="glass-elevated rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-text-muted mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className={`text-sm font-semibold tabular-nums ${
            entry.dataKey === 'value' ? 'text-champagne' : 'text-text-muted'
          }`}
        >
          {entry.dataKey === 'value' ? 'Portfolio' : 'Benchmark'}:{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1,
          }).format(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [activePeriod, setActivePeriod] = useState<(typeof periods)[number]>('1Y');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Portfolio Performance
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            vs. S&P 500 Benchmark
          </p>
        </div>

        {/* Period Selector — Pill toggle */}
        <div className="flex items-center bg-surface-card rounded-lg p-0.5">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`
                relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                ${activePeriod === period
                  ? 'text-champagne'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              {activePeriod === period && (
                <motion.div
                  layoutId="periodPill"
                  className="absolute inset-0 bg-champagne/10 rounded-md border border-champagne/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{period}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              {/* Champagne gradient for portfolio area */}
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A96E" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#C9A96E" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity={0} />
              </linearGradient>
              {/* Midnight gradient for benchmark */}
              <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A5F" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1E3A5F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#71717a' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#71717a' }}
              tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
              dx={-8}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Benchmark area — subtle background context */}
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="#1E3A5F"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#benchmarkGradient)"
            />
            {/* Portfolio area — primary visual story */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#C9A96E"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
