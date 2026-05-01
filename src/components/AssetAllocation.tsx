'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { AssetClass } from '@/data/mockData';

/**
 * ASSET ALLOCATION — Donut Chart
 * ───────────────────────────────
 * UX DECISION: Donut chart chosen over pie chart for two reasons:
 * 1. The hollow center provides space for the total value — reducing chart-junk
 * 2. Aesthetically, donuts feel more modern and premium than solid pies
 *
 * The legend is placed beside the chart (not below) on desktop to maintain
 * horizontal scanning efficiency. On mobile, it stacks vertically.
 *
 * Hover interaction highlights a single slice and dims others — this
 * "focus + context" pattern helps users compare without losing the whole picture.
 */

interface AssetAllocationProps {
  data: AssetClass[];
}

// Custom active shape for hover state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderActiveShape(props: any) {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={1}
      />
    </g>
  );
}

export default function AssetAllocation({ data }: AssetAllocationProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <h3 className="font-display text-lg font-semibold text-text-primary mb-6">
        Asset Allocation
      </h3>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={activeIndex >= 0 ? 84 : 80}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={activeIndex === -1 || activeIndex === index ? 1 : 0.3}
                    className="transition-opacity duration-300"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label — total value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Total</p>
            <p className="font-display text-lg font-bold text-text-primary tabular-nums">
              ${(total / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full">
          {data.map((asset, index) => (
            <motion.div
              key={asset.name}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(-1)}
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
                transition-all duration-200
                ${activeIndex === index
                  ? 'bg-surface-elevated/80'
                  : 'hover:bg-surface-elevated/40'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm text-text-secondary">{asset.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {asset.percentage}%
                </span>
                <span
                  className={`text-[11px] font-medium tabular-nums ${
                    asset.change >= 0 ? 'text-positive' : 'text-negative'
                  }`}
                >
                  {asset.change >= 0 ? '+' : ''}
                  {asset.change}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
