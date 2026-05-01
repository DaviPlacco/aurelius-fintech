'use client';

/**
 * PORTFOLIO PAGE
 * ──────────────
 * UX DECISION: Portfolio view uses a "master-detail" pattern.
 * Top summary cards show aggregate performance by asset class.
 * Below, a detailed holdings table with sortable columns.
 * 
 * Each asset class card uses its brand color as a left accent
 * border for instant visual categorization without reading.
 */

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { AssetRow } from '@/components/AssetRow';
import { assetAllocation } from '@/data/mockData';

const holdings = [
  { name: 'Vanguard S&P 500 ETF', ticker: 'VOO', class: 'Equities', value: 2180000, shares: 4250, price: 512.94, change: 1.24, allocation: 13.8 },
  { name: 'Blackstone Growth Fund IV', ticker: 'PRIV', class: 'Private Equity', value: 1800000, shares: 1, price: 1800000, change: 18.7, allocation: 11.4 },
  { name: 'Lisboa Prime Tower — 12A', ticker: 'RE', class: 'Real Estate', value: 1450000, shares: 1, price: 1450000, change: 6.2, allocation: 9.2 },
  { name: 'Apple Inc.', ticker: 'AAPL', value: 980000, class: 'Equities', shares: 4200, price: 233.33, change: 2.1, allocation: 6.2 },
  { name: 'iShares MSCI World ETF', ticker: 'URTH', class: 'Equities', value: 850000, shares: 6100, price: 139.34, change: 0.8, allocation: 5.4 },
  { name: 'US Treasury Bond 10Y', ticker: 'T-10Y', class: 'Fixed Income', value: 800000, shares: 800, price: 1000, change: 0.3, allocation: 5.0 },
  { name: 'KKR Real Estate Fund III', ticker: 'PRIV', class: 'Private Equity', value: 750000, shares: 1, price: 750000, change: 14.2, allocation: 4.7 },
  { name: 'Bitcoin (BTC)', ticker: 'BTC', class: 'Crypto', value: 485000, shares: 4.99, price: 97194.39, change: -3.2, allocation: 3.1 },
  { name: 'Ethereum (ETH)', ticker: 'ETH', class: 'Crypto', value: 307396, shares: 85.2, price: 3608.99, change: -1.8, allocation: 1.9 },
  { name: 'Porto Marina Residence', ticker: 'RE', class: 'Real Estate', value: 1200000, shares: 1, price: 1200000, change: 8.5, allocation: 7.6 },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
            Portfolio
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Detailed breakdown of your holdings across all asset classes
          </p>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg gradient-champagne text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity">
          <ExternalLink className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Asset Class Summary Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-8"
      >
        {assetAllocation.map((asset) => (
          <motion.div
            key={asset.name}
            variants={fadeUp}
            className="glass rounded-xl p-4 relative overflow-hidden border-l-2 hover:border-l-4 transition-all duration-200 cursor-pointer group"
            style={{ borderLeftColor: asset.color }}
          >
            <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1 truncate">
              {asset.name}
            </p>
            <p className="font-display text-lg font-bold text-text-primary tabular-nums">
              {asset.percentage}%
            </p>
            <div className="flex items-center gap-1 mt-1">
              {asset.change >= 0 ? (
                <TrendingUp className="w-3 h-3 text-positive" />
              ) : (
                <TrendingDown className="w-3 h-3 text-negative" />
              )}
              <span className={`text-[11px] font-medium tabular-nums ${asset.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                {asset.change >= 0 ? '+' : ''}{asset.change}%
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            All Holdings
          </h3>
          <span className="text-xs text-text-muted bg-surface-elevated px-2.5 py-1 rounded-full">
            {holdings.length} positions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] text-text-muted uppercase tracking-wider border-b border-border-subtle">
                <th className="px-6 py-3 font-medium">Asset</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Class</th>
                <th className="px-4 py-3 font-medium text-right">Value</th>
                <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Price</th>
                <th className="px-4 py-3 font-medium text-right">Return</th>
                <th className="px-4 py-3 font-medium text-right hidden lg:table-cell">Weight</th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => (
                <AssetRow key={h.name} asset={h} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
