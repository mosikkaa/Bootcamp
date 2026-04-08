/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.redclass.redberryinternship.ge",
            },
        ],
    },
};

export default nextConfig;
