'use client';

/**
 * REAL ESTATE PAGE
 * ────────────────
 * UX DECISION: Property portfolio uses a card-based layout with
 * large imagery placeholders. Each property card shows key metrics
 * (valuation, rental yield, appreciation) in a scannable format.
 *
 * Properties use a status system: "Active" (generating income),
 * "Under Acquisition" (pending), "Under Renovation" (capital expenditure).
 */

import { motion } from 'framer-motion';
import {
  MapPin, TrendingUp, Banknote, Calendar,
  Home, Building2, Key, ArrowUpRight,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const properties = [
  {
    id: 1,
    name: 'Lisboa Prime Tower — Unit 12A',
    location: 'Parque das Nações, Lisboa',
    type: 'Commercial Office',
    value: 1450000,
    purchasePrice: 1220000,
    appreciation: 18.9,
    rentalYield: 6.2,
    monthlyRent: 7490,
    status: 'active' as const,
    acquired: '2024-03-15',
    sqm: 185,
    occupancy: 100,
  },
  {
    id: 2,
    name: 'Porto Marina Residence',
    location: 'Foz do Douro, Porto',
    type: 'Luxury Residential',
    value: 1200000,
    purchasePrice: 980000,
    appreciation: 22.4,
    rentalYield: 5.8,
    monthlyRent: 5800,
    status: 'active' as const,
    acquired: '2023-09-01',
    sqm: 240,
    occupancy: 100,
  },
  {
    id: 3,
    name: 'Algarve Boutique Hotel — 40%',
    location: 'Lagos, Algarve',
    type: 'Hospitality',
    value: 820000,
    purchasePrice: 750000,
    appreciation: 9.3,
    rentalYield: 8.4,
    monthlyRent: 5740,
    status: 'active' as const,
    acquired: '2025-01-20',
    sqm: 680,
    occupancy: 87,
  },
  {
    id: 4,
    name: 'Cascais Beachfront Villa',
    location: 'Cascais, Lisboa',
    type: 'Luxury Residential',
    value: 2100000,
    purchasePrice: 2100000,
    appreciation: 0,
    rentalYield: 0,
    monthlyRent: 0,
    status: 'acquisition' as const,
    acquired: '2026-04-22',
    sqm: 320,
    occupancy: 0,
  },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-positive', bg: 'bg-positive/10', icon: Key },
  acquisition: { label: 'Under Acquisition', color: 'text-amber-400', bg: 'bg-amber-400/10', icon: Calendar },
  renovation: { label: 'Renovation', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Building2 },
};

const totalValue = properties.reduce((sum, p) => sum + p.value, 0);
const totalRent = properties.reduce((sum, p) => sum + p.monthlyRent, 0);
const avgYield = properties.filter(p => p.rentalYield > 0).reduce((sum, p) => sum + p.rentalYield, 0) / properties.filter(p => p.rentalYield > 0).length;

export default function RealEstatePage() {
  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
          Real Estate
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Property portfolio and rental income overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Portfolio Value', value: `$${(totalValue / 1000000).toFixed(2)}M`, icon: Building2, color: 'text-champagne' },
          { label: 'Monthly Rental Income', value: `$${totalRent.toLocaleString()}`, icon: Banknote, color: 'text-positive' },
          { label: 'Avg. Rental Yield', value: `${avgYield.toFixed(1)}%`, icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Properties', value: properties.length.toString(), icon: Home, color: 'text-text-primary' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <Icon className={`w-4 h-4 ${stat.color} mb-2`} />
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</p>
              <p className={`font-display text-xl font-bold tabular-nums mt-0.5 ${stat.color}`}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {properties.map((property, i) => {
          const status = statusConfig[property.status];
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden group hover:border-border-active transition-colors cursor-pointer"
            >
              {/* Property Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-surface-elevated to-surface-card relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-text-muted/20" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${status.color} ${status.bg} backdrop-blur-sm`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-surface-card to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                  {property.name}
                </h3>
                <div className="flex items-center gap-1.5 text-text-muted mb-4">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{property.location}</span>
                  <span className="text-xs">·</span>
                  <span className="text-xs">{property.type}</span>
                  <span className="text-xs">·</span>
                  <span className="text-xs">{property.sqm}m²</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Valuation</p>
                    <p className="font-display text-lg font-bold text-text-primary tabular-nums">
                      ${(property.value / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Rental Yield</p>
                    <p className={`font-display text-lg font-bold tabular-nums ${property.rentalYield > 0 ? 'text-positive' : 'text-text-muted'}`}>
                      {property.rentalYield > 0 ? `${property.rentalYield}%` : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Appreciation</p>
                    <div className="flex items-center gap-1">
                      {property.appreciation > 0 && <ArrowUpRight className="w-3.5 h-3.5 text-positive" />}
                      <p className={`font-display text-lg font-bold tabular-nums ${property.appreciation > 0 ? 'text-positive' : 'text-text-muted'}`}>
                        {property.appreciation > 0 ? `+${property.appreciation}%` : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                {property.occupancy > 0 && (
                  <div className="mt-4 pt-4 border-t border-border-subtle">
                    <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                      <span>Occupancy</span>
                      <span className="tabular-nums">{property.occupancy}%</span>
                    </div>
                    <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${property.occupancy}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-positive rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
