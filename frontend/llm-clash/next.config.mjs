/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    trailingSlash: false,
    async redirects() {
        return [];
    },
    async rewrites() {
        return [];
    },
};

export default nextConfig;
