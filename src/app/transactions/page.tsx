'use client';

/**
 * TRANSACTIONS PAGE
 * ─────────────────
 * UX DECISION: Full transaction history with advanced multi-filter system.
 * Uses a horizontally scrollable filter bar for mobile efficiency.
 * Each transaction row expands on hover to reveal additional context.
 * 
 * Search is placed prominently at the top — in wealth management,
 * users frequently need to find specific transactions for tax/audit purposes.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  Download,
  Upload,
  Check,
  Clock,
  XCircle,
  Calendar,
  SlidersHorizontal,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

type StatusFilter = 'all' | 'completed' | 'pending' | 'failed';
type TypeFilter = 'all' | 'buy' | 'sell' | 'dividend' | 'deposit' | 'withdrawal';

const allTransactions = [
  { id: 'TXN-001', type: 'buy', asset: 'Blackstone Growth Fund IV', amount: 500000, date: '2026-04-25', status: 'completed', category: 'Private Equity', description: 'Series D commitment via Capital Call #3' },
  { id: 'TXN-002', type: 'dividend', asset: 'Vanguard S&P 500 ETF', amount: 28450, date: '2026-04-24', status: 'completed', category: 'Equities', description: 'Quarterly dividend distribution Q1 2026' },
  { id: 'TXN-003', type: 'buy', asset: 'Lisboa Prime Tower — Unit 12A', amount: 1200000, date: '2026-04-22', status: 'pending', category: 'Real Estate', description: 'Commercial property acquisition — awaiting notary' },
  { id: 'TXN-004', type: 'sell', asset: 'Bitcoin (BTC)', amount: 85000, date: '2026-04-20', status: 'completed', category: 'Crypto', description: 'Partial position exit — 0.87 BTC at $97,701' },
  { id: 'TXN-005', type: 'deposit', asset: 'Wire Transfer — UBS Zurich', amount: 750000, date: '2026-04-18', status: 'completed', category: 'Cash', description: 'International wire from CHF account' },
  { id: 'TXN-006', type: 'buy', asset: 'US Treasury Bond 10Y', amount: 200000, date: '2026-04-15', status: 'failed', category: 'Fixed Income', description: 'Auction bid — below minimum threshold' },
  { id: 'TXN-007', type: 'dividend', asset: 'Apple Inc.', amount: 4200, date: '2026-04-12', status: 'completed', category: 'Equities', description: 'Quarterly dividend — $1.00/share' },
  { id: 'TXN-008', type: 'buy', asset: 'KKR Real Estate Fund III', amount: 250000, date: '2026-04-10', status: 'completed', category: 'Private Equity', description: 'Capital call — 2nd installment' },
  { id: 'TXN-009', type: 'sell', asset: 'Ethereum (ETH)', amount: 45000, date: '2026-04-08', status: 'completed', category: 'Crypto', description: 'Rebalancing — reduced to 5% target' },
  { id: 'TXN-010', type: 'deposit', asset: 'Wire Transfer — Deutsche Bank', amount: 500000, date: '2026-04-05', status: 'completed', category: 'Cash', description: 'Monthly capital allocation' },
  { id: 'TXN-011', type: 'buy', asset: 'iShares MSCI World ETF', amount: 150000, date: '2026-04-03', status: 'completed', category: 'Equities', description: 'DCA — monthly systematic purchase' },
  { id: 'TXN-012', type: 'withdrawal', asset: 'Personal Account Transfer', amount: 50000, date: '2026-04-01', status: 'completed', category: 'Cash', description: 'Monthly personal allowance' },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  buy: { icon: ArrowUpRight, color: 'text-positive', bg: 'bg-positive/10' },
  sell: { icon: ArrowDownLeft, color: 'text-negative', bg: 'bg-negative/10' },
  dividend: { icon: Banknote, color: 'text-champagne', bg: 'bg-champagne/10' },
  deposit: { icon: Download, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  withdrawal: { icon: Upload, color: 'text-orange-400', bg: 'bg-orange-400/10' },
};

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  completed: { icon: Check, color: 'text-positive', label: 'Completed' },
  pending: { icon: Clock, color: 'text-amber-400', label: 'Pending' },
  failed: { icon: XCircle, color: 'text-negative', label: 'Failed' },
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filtered = allTransactions.filter((tx) => {
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
    if (searchQuery && !tx.asset.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalVolume = filtered.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
            Transactions
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Complete transaction history with advanced filtering
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-border-subtle text-text-secondary text-sm hover:border-border-active transition-colors">
            <Calendar className="w-4 h-4" />
            Apr 2026
          </button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Volume', value: `$${(totalVolume / 1000000).toFixed(2)}M`, color: 'text-text-primary' },
          { label: 'Transactions', value: filtered.length.toString(), color: 'text-text-primary' },
          { label: 'Completed', value: filtered.filter(t => t.status === 'completed').length.toString(), color: 'text-positive' },
          { label: 'Pending', value: filtered.filter(t => t.status === 'pending').length.toString(), color: 'text-amber-400' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl px-4 py-3"
          >
            <p className="text-[11px] text-text-muted uppercase tracking-wider">{stat.label}</p>
            <p className={`font-display text-xl font-bold tabular-nums mt-0.5 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters + Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="px-4 lg:px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-subtle bg-surface-card/50 flex-1 w-full sm:w-auto">
            <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
            {(['all', 'buy', 'sell', 'dividend', 'deposit'] as TypeFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md capitalize whitespace-nowrap transition-colors ${
                  typeFilter === f ? 'text-champagne bg-champagne/10 border border-champagne/20' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
            <div className="w-px h-4 bg-border-subtle" />
            {(['all', 'completed', 'pending', 'failed'] as StatusFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md capitalize whitespace-nowrap transition-colors ${
                  statusFilter === f ? 'text-champagne bg-champagne/10 border border-champagne/20' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-border-subtle">
          <AnimatePresence mode="popLayout">
            {filtered.map((tx) => {
              const type = typeConfig[tx.type];
              const status = statusConfig[tx.status];
              const TypeIcon = type.icon;
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 px-4 lg:px-6 py-4 hover:bg-surface-elevated/20 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl ${type.bg} flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className={`w-5 h-5 ${type.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text-primary truncate">{tx.asset}</p>
                      <span className="text-[10px] text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded hidden sm:inline">{tx.category}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 truncate">{tx.description}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-semibold tabular-nums ${
                      tx.type === 'sell' || tx.type === 'withdrawal' ? 'text-negative' : 'text-text-primary'
                    }`}>
                      {tx.type === 'sell' || tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 justify-end mt-0.5">
                      <StatusIcon className={`w-3 h-3 ${status.color}`} />
                      <span className={`text-[10px] font-medium ${status.color}`}>{status.label}</span>
                      <span className="text-[10px] text-text-muted">·</span>
                      <span className="text-[10px] text-text-muted">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <Search className="w-8 h-8 mb-3 opacity-30" />
              <p className="text-sm">No transactions match your filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
