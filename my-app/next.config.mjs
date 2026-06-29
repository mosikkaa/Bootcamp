/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'i.pravatar.cc' },
            { protocol: 'https', hostname: 'picsum.photos' },
            { protocol: 'http', hostname: 'localhost', port: '8000' }, // your API-served images
        ],
    },
};

export default nextConfig;
