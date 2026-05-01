/**
 * ============================================
 * AURELIUS PRIVATE EQUITY — Mock Financial Data
 * ============================================
 * Realistic wealth management data for portfolio demonstration.
 * All values in USD. Data patterns simulate organic market growth
 * with natural volatility to appear authentic.
 */

export interface PortfolioDataPoint {
  month: string;
  value: number;
  benchmark: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'deposit' | 'withdrawal';
  asset: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

export interface AssetClass {
  name: string;
  value: number;
  percentage: number;
  color: string;
  change: number;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: number;
}

// Net Worth evolution over 12 months — shows consistent growth with natural dips
export const portfolioHistory: PortfolioDataPoint[] = [
  { month: 'Mai', value: 12400000, benchmark: 12100000 },
  { month: 'Jun', value: 12850000, benchmark: 12250000 },
  { month: 'Jul', value: 12600000, benchmark: 12180000 },
  { month: 'Ago', value: 13100000, benchmark: 12400000 },
  { month: 'Set', value: 13450000, benchmark: 12550000 },
  { month: 'Out', value: 13200000, benchmark: 12480000 },
  { month: 'Nov', value: 13800000, benchmark: 12700000 },
  { month: 'Dez', value: 14250000, benchmark: 12900000 },
  { month: 'Jan', value: 14100000, benchmark: 12850000 },
  { month: 'Fev', value: 14600000, benchmark: 13050000 },
  { month: 'Mar', value: 15100000, benchmark: 13200000 },
  { month: 'Abr', value: 15847920, benchmark: 13400000 },
];

// Asset allocation — diversified portfolio typical of UHNW individuals
export const assetAllocation: AssetClass[] = [
  { name: 'Equities', value: 5547772, percentage: 35, color: '#C9A96E', change: 12.4 },
  { name: 'Real Estate', value: 3961980, percentage: 25, color: '#1E3A5F', change: 8.2 },
  { name: 'Private Equity', value: 3169584, percentage: 20, color: '#6366f1', change: 18.7 },
  { name: 'Fixed Income', value: 1584792, percentage: 10, color: '#475569', change: 4.1 },
  { name: 'Crypto', value: 792396, percentage: 5, color: '#f59e0b', change: -3.2 },
  { name: 'Cash & Equiv.', value: 791396, percentage: 5, color: '#64748b', change: 0.3 },
];

// Recent transactions
export const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'buy',
    asset: 'Blackstone Growth Fund IV',
    amount: 500000,
    date: '2026-04-25',
    status: 'completed',
    category: 'Private Equity',
  },
  {
    id: 'TXN-002',
    type: 'dividend',
    asset: 'Vanguard S&P 500 ETF',
    amount: 28450,
    date: '2026-04-24',
    status: 'completed',
    category: 'Equities',
  },
  {
    id: 'TXN-003',
    type: 'buy',
    asset: 'Lisboa Prime Tower — Unit 12A',
    amount: 1200000,
    date: '2026-04-22',
    status: 'pending',
    category: 'Real Estate',
  },
  {
    id: 'TXN-004',
    type: 'sell',
    asset: 'Bitcoin (BTC)',
    amount: 85000,
    date: '2026-04-20',
    status: 'completed',
    category: 'Crypto',
  },
  {
    id: 'TXN-005',
    type: 'deposit',
    asset: 'Wire Transfer — UBS Zurich',
    amount: 750000,
    date: '2026-04-18',
    status: 'completed',
    category: 'Cash',
  },
  {
    id: 'TXN-006',
    type: 'buy',
    asset: 'US Treasury Bond 10Y',
    amount: 200000,
    date: '2026-04-15',
    status: 'failed',
    category: 'Fixed Income',
  },
];

// Real-time market indices
export const marketIndices: MarketIndex[] = [
  { name: 'S&P 500', value: '5,842.31', change: 0.67 },
  { name: 'NASDAQ', value: '18,439.17', change: 1.12 },
  { name: 'BTC/USD', value: '97,245.00', change: -0.84 },
];

// Quick stats
export const quickStats = {
  totalNetWorth: 15847920,
  monthlyReturn: 3.47,
  ytdReturn: 11.24,
  monthlyIncome: 42850,
  riskScore: 6.2, // out of 10
  portfolioAlpha: 2.8, // percentage points above benchmark
};

// Navigation items for sidebar
export const navItems = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/', active: true },
  { label: 'Portfolio', icon: 'Briefcase', href: '/portfolio', active: false },
  { label: 'Transactions', icon: 'ArrowLeftRight', href: '/transactions', active: false },
  { label: 'Analytics', icon: 'BarChart3', href: '/analytics', active: false },
  { label: 'Real Estate', icon: 'Building2', href: '/real-estate', active: false },
  { label: 'Documents', icon: 'FileText', href: '/documents', active: false },
  { label: 'Settings', icon: 'Settings', href: '/settings', active: false },
];
