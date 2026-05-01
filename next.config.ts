import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Se o repositório não for a página principal (username.github.io), 
  // descomente a linha abaixo e coloque o nome do seu repositório:
  basePath: '/aurelius-fintech',
};

export default nextConfig;
