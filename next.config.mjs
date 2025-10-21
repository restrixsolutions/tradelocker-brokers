import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gmqmugsbrvhootvipxck.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    mdxRs: false,
  },
  webpack: (config, { isServer }) => {
    // Fix for PostHog trying to import Node.js modules on client side
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs': false,
        'node:path': false,
        'node:child_process': false,
      }
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
      }
    }
    return config
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
