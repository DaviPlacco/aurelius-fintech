'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  Download,
  Upload,
  AlertCircle,
  Check,
  Clock,
  XCircle,
  Filter,
} from 'lucide-react';
import type { Transaction } from '@/data/mockData';

/**
 * TRANSACTION LEDGER
 * ──────────────────
 * UX DECISION: Maximum 5 visible transactions to maintain whitespace discipline.
 * This prevents the "data dump" anti-pattern common in fintech dashboards.
 *
 * Status badges use semantic colors with subtle backgrounds (not solid fills)
 * to maintain the dark theme's visual calm. Solid badges would create too
 * many competing focal points.
 *
 * Transaction type icons help pre-attentive processing — users can scan
 * the list by icon shape before reading text, dramatically reducing cognitive load.
 */

type FilterType = 'all' | 'buy' | 'sell' | 'dividend' | 'deposit';

const typeConfig: Record<
  string,
  { icon: React.ElementType; label: string; color: string }
> = {
  buy: { icon: ArrowUpRight, label: 'Buy', color: 'text-positive' },
  sell: { icon: ArrowDownLeft, label: 'Sell', color: 'text-negative' },
  dividend: { icon: Banknote, label: 'Dividend', color: 'text-champagne' },
  deposit: { icon: Download, label: 'Deposit', color: 'text-blue-400' },
  withdrawal: { icon: Upload, label: 'Withdrawal', color: 'text-orange-400' },
};

const statusConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  completed: { icon: Check, color: 'text-positive', bg: 'bg-positive/10' },
  pending: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  failed: { icon: XCircle, color: 'text-negative', bg: 'bg-negative/10' },
};

interface TransactionLedgerProps {
  transactions: Transaction[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatAmount(amount: number, type: string): string {
  const prefix = type === 'sell' || type === 'withdrawal' ? '-' : '+';
  return `${prefix}$${amount.toLocaleString('en-US')}`;
}

export default function TransactionLedger({
  transactions,
}: TransactionLedgerProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const filters: FilterType[] = ['all', 'buy', 'sell', 'dividend', 'deposit'];

  const filtered =
    filter === 'all'
      ? transactions.slice(0, 5)
      : transactions.filter((t) => t.type === filter).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          Recent Activity
        </h3>
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-text-muted mr-1" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-2.5 py-1 text-[11px] font-medium rounded-md capitalize transition-colors
                ${filter === f
                  ? 'text-champagne bg-champagne/10 border border-champagne/20'
                  : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-1">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-elevated/40 transition-colors group cursor-pointer"
              >
                {/* Type Icon */}
                <div
                  className={`w-9 h-9 rounded-lg bg-surface-elevated flex items-center justify-center flex-shrink-0 ${type.color}`}
                >
                  <TypeIcon className="w-4 h-4" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {tx.asset}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-text-muted">
                      {formatDate(tx.date)}
                    </span>
                    <span className="text-[11px] text-text-muted">·</span>
                    <span className="text-[11px] text-text-muted">
                      {tx.category}
                    </span>
                  </div>
                </div>

                {/* Amount + Status */}
                <div className="text-right flex-shrink-0">
                  <p
                    className={`text-sm font-semibold tabular-nums ${
                      tx.type === 'sell' || tx.type === 'withdrawal'
                        ? 'text-negative'
                        : 'text-text-primary'
                    }`}
                  >
                    {formatAmount(tx.amount, tx.type)}
                  </p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <StatusIcon className={`w-3 h-3 ${status.color}`} />
                    <span
                      className={`text-[10px] font-medium capitalize ${status.color}`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-text-muted">
            <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm">No transactions found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
