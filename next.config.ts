import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/conduit", destination: "/designs/dx-i/conduit", permanent: true },
      { source: "/flux", destination: "/designs/dx-i/flux", permanent: true },
      { source: "/shell", destination: "/designs/dx-i/shell", permanent: true },
    ];
  },
};

export default nextConfig;
