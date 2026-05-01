'use client';

/**
 * ANALYTICS PAGE
 * ──────────────
 * UX DECISION: Analytics uses a multi-chart layout to provide deep
 * performance insights. Each chart answers a specific question:
 * - Area Chart: "How has my wealth grown?" (temporal narrative)
 * - Bar Chart: "Which months were best/worst?" (comparison)
 * - Metric Cards: "What are my key performance indicators?" (snapshot)
 *
 * Charts use consistent color language: champagne = portfolio, 
 * midnight = benchmark, green = positive, red = negative.
 */

import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, Target, Percent, ShieldCheck, Zap, Award,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { portfolioHistory } from '@/data/mockData';

// Monthly returns data derived from portfolio history
const monthlyReturns = portfolioHistory.slice(1).map((point, i) => ({
  month: point.month,
  return: Number((((point.value - portfolioHistory[i].value) / portfolioHistory[i].value) * 100).toFixed(2)),
  benchmark: Number((((point.benchmark - portfolioHistory[i].benchmark) / portfolioHistory[i].benchmark) * 100).toFixed(2)),
}));

const kpis = [
  { label: 'Sharpe Ratio', value: '1.82', icon: Zap, color: 'text-champagne', desc: 'Risk-adjusted return' },
  { label: 'Max Drawdown', value: '-4.2%', icon: TrendingUp, color: 'text-negative', desc: 'Largest peak-to-trough' },
  { label: 'Volatility', value: '8.7%', icon: Percent, color: 'text-amber-400', desc: 'Annualized std deviation' },
  { label: 'Beta', value: '0.74', icon: ShieldCheck, color: 'text-blue-400', desc: 'Market sensitivity' },
  { label: 'Alpha', value: '+2.8%', icon: Award, color: 'text-positive', desc: 'Excess return vs benchmark' },
  { label: 'Win Rate', value: '73%', icon: Target, color: 'text-emerald-400', desc: 'Positive months ratio' },
];

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-elevated rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-text-muted mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className={`text-sm font-semibold tabular-nums ${entry.value >= 0 ? 'text-positive' : 'text-negative'}`}>
          {entry.dataKey === 'return' ? 'Portfolio' : 'Benchmark'}: {entry.value >= 0 ? '+' : ''}{entry.value}%
        </p>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
          Analytics
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Deep performance insights and risk metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="glass rounded-xl p-4 group hover:border-border-active transition-colors cursor-pointer"
            >
              <Icon className={`w-4 h-4 ${kpi.color} mb-2`} />
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{kpi.label}</p>
              <p className="font-display text-xl font-bold text-text-primary tabular-nums mt-0.5">{kpi.value}</p>
              <p className="text-[10px] text-text-muted mt-1">{kpi.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Wealth Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
            Wealth Growth
          </h3>
          <p className="text-xs text-text-muted mb-6">Portfolio vs S&P 500 Benchmark</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A96E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C9A96E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} width={50} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="benchmark" stroke="#1E3A5F" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
                <Area type="monotone" dataKey="value" stroke="#C9A96E" strokeWidth={2} fill="url(#aGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Returns Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
            Monthly Returns
          </h3>
          <p className="text-xs text-text-muted mb-6">Portfolio return % by month</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} tickFormatter={(v) => `${v}%`} width={40} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="return" radius={[4, 4, 0, 0]} fill="#C9A96E" opacity={0.8} />
                <Bar dataKey="benchmark" radius={[4, 4, 0, 0]} fill="#1E3A5F" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
