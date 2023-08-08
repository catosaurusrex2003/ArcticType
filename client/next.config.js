/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains:["yxmpzjixlguejtcgxtfu.supabase.co"]
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yxmpzjixlguejtcgxtfu.supabase.co',
            },
        ],
    },
}

module.exports = nextConfig
