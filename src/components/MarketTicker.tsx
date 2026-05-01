'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MarketTickerPopover } from './MarketTickerPopover';
import type { MarketIndex } from '@/data/mockData';

/**
 * MARKET TICKER COMPONENT
 * ───────────────────────
 * UX DECISION: Interactive tickers transform a static data strip into 
 * a functional tool. Clicking provides immediate depth without context switching.
 */

export function MarketTicker({ index }: { index: MarketIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock trend data
  const trendData = index.change >= 0 
    ? [5800, 5810, 5805, 5825, 5842] 
    : [98000, 97800, 97950, 97500, 97245];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-elevated/50 transition-colors group"
        aria-label={`View details for ${index.name}`}
      >
        <span className="text-xs text-text-muted font-medium group-hover:text-text-primary transition-colors">
          {index.name}
        </span>
        <span className="text-xs text-text-primary font-semibold tabular-nums">
          {index.value}
        </span>
        <span
          className={`
            flex items-center gap-0.5 text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded-full
            ${index.change >= 0
              ? 'text-positive bg-positive/10'
              : 'text-negative bg-negative/10'
            }
          `}
        >
          {index.change >= 0 ? '+' : ''}{index.change}%
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for easy closing */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <MarketTickerPopover index={index} trendData={trendData} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
