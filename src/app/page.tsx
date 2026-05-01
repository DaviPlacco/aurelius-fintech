'use client';
import { useState } from 'react';

/**
 * DASHBOARD PAGE — Home
 * ─────────────────────
 * Bento Grid layout following Z-pattern reading model.
 */

import DashboardLayout from '@/components/DashboardLayout';
import NetWorthCard from '@/components/NetWorthCard';
import PerformanceChart from '@/components/PerformanceChart';
import AssetAllocation from '@/components/AssetAllocation';
import TransactionLedger from '@/components/TransactionLedger';
import QuickStats from '@/components/QuickStats';
import {
  portfolioHistory,
  assetAllocation,
  transactions,
  quickStats,
} from '@/data/mockData';

export default function Dashboard() {
  const [currentDate] = useState(() => {
    if (typeof window !== 'undefined') {
      return new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return '';
  });

  const [greeting] = useState(() => {
    if (typeof window !== 'undefined') {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    }
    return 'Good afternoon';
  });

  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
          {greeting}, <span className="text-champagne">Victor</span>
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Here&apos;s your wealth overview for today, {currentDate || 'April 26, 2026'}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <div className="md:col-span-2 xl:col-span-2">
          <NetWorthCard
            totalNetWorth={quickStats.totalNetWorth}
            monthlyReturn={quickStats.monthlyReturn}
            ytdReturn={quickStats.ytdReturn}
          />
        </div>
        <QuickStats
          monthlyIncome={quickStats.monthlyIncome}
          portfolioAlpha={quickStats.portfolioAlpha}
          riskScore={quickStats.riskScore}
        />
        <div className="md:col-span-2 xl:col-span-4">
          <PerformanceChart data={portfolioHistory} />
        </div>
        <div className="md:col-span-2">
          <AssetAllocation data={assetAllocation} />
        </div>
        <div className="md:col-span-2">
          <TransactionLedger transactions={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
