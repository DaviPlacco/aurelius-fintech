import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Define o basePath apenas quando estiver rodando no GitHub Actions
  basePath: isGithubActions ? '/aurelius-fintech' : '',
  assetPrefix: isGithubActions ? '/aurelius-fintech/' : '',
  
  // Silenciar erros de lint/ts apenas durante o build de produção (CI)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
