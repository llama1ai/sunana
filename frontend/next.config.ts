import type { NextConfig } from 'next';
import { NEXT_OUTPUT } from './src/env';

const nextConfig = (): NextConfig => ({
  output: NEXT_OUTPUT,
});

export default nextConfig;
