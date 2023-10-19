/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/nextspace',
                permanent: false,
            },
        ]
    },
}

module.exports = nextConfig
