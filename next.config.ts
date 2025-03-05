import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*",
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
