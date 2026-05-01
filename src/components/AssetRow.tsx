'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, ArrowUpRight, TrendingDown, 
  History, Bell, ShoppingCart, Info, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import { Sparkline } from './ui/Sparkline';
import { useStore } from '@/store/useStore';

interface AssetRowProps {
  asset: any;
  index: number;
}

export function AssetRow({ asset, index }: AssetRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { addToast } = useStore();

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    addToast(`${action}: ${asset.name}`, 'info');
  };

  // Generate some fake trend data for the expansion
  const trendData = Array.from({ length: 20 }, () => Math.random() * 100);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.03 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          border-b border-white/5 last:border-0 cursor-pointer transition-all
          ${isExpanded ? 'bg-white/5' : 'hover:bg-white/[0.02]'}
          group
        `}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-[10px] font-bold text-champagne">
                {asset.ticker.substring(0, 2)}
             </div>
             <div>
                <p className="text-sm font-medium text-white">{asset.name}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{asset.ticker}</p>
             </div>
          </div>
        </td>
        <td className="px-4 py-4 hidden md:table-cell">
          <span className="text-[10px] font-bold text-zinc-400 bg-white/5 px-2 py-1 rounded uppercase tracking-wider">
            {asset.class}
          </span>
        </td>
        <td className="px-4 py-4 text-right tabular-nums font-medium text-white">
          ${asset.value.toLocaleString()}
        </td>
        <td className="px-4 py-4 text-right tabular-nums text-zinc-400 hidden sm:table-cell">
          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </td>
        <td className="px-4 py-4 text-right">
          <div className="flex items-center gap-1 justify-end">
            {asset.change >= 0 ? (
              <ArrowUpRight className="w-3 h-3 text-positive" />
            ) : (
              <TrendingDown className="w-3 h-3 text-negative" />
            )}
            <span className={`text-sm font-bold tabular-nums ${asset.change >= 0 ? 'text-positive' : 'text-negative'}`}>
              {asset.change >= 0 ? '+' : ''}{asset.change}%
            </span>
          </div>
        </td>
        <td className="px-4 py-4 text-right hidden lg:table-cell">
           <div className="flex items-center gap-3 justify-end">
              <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-champagne rounded-full" style={{ width: `${asset.allocation * 5}%` }} />
              </div>
              <span className="text-[11px] text-zinc-500 font-medium w-8">{asset.allocation}%</span>
           </div>
        </td>
        <td className="px-4 py-4 text-right relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-zinc-500" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-4 top-12 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 p-1 overflow-hidden"
                >
                  <button onClick={(e) => handleAction(e, 'Buy/Sell')} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <ShoppingCart className="w-4 h-4" /> Buy/Sell
                  </button>
                  <button onClick={(e) => handleAction(e, 'View History')} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <History className="w-4 h-4" /> View History
                  </button>
                  <button onClick={(e) => handleAction(e, 'Set Alert')} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Bell className="w-4 h-4" /> Set Alert
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </td>
      </motion.tr>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={7} className="px-6 pb-6 pt-0 bg-white/5">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-white/5">
                   <div className="space-y-4">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Technical Details</p>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <p className="text-[10px] text-zinc-500 mb-1">Expense Ratio</p>
                            <p className="text-sm font-bold text-white">0.03%</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-zinc-500 mb-1">Dividend Yield</p>
                            <p className="text-sm font-bold text-positive">1.34%</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-zinc-500 mb-1">PE Ratio</p>
                            <p className="text-sm font-bold text-white">24.5x</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-zinc-500 mb-1">Volatility</p>
                            <p className="text-sm font-bold text-zinc-300">Moderate</p>
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">7-Day Performance</p>
                         <p className="text-xs font-bold text-positive">+2.45% vs Week</p>
                      </div>
                      <div className="h-24 w-full bg-black/20 rounded-xl p-4">
                         <Sparkline data={trendData} color="#d9a05b" />
                      </div>
                   </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
