import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/*",
      },
    ],
  },
  rewrites: () => {
    return Promise.resolve([
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ]);
  },
};

export default nextConfig;
