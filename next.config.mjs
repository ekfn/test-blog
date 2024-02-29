/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    imageSizes: [240, 480],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
    ],
  },
};

export default nextConfig;
