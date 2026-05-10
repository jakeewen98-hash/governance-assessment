import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],

  webpack(config, { isServer }) {
    if (!isServer) {
      // Prevent any accidentally bundled server-only packages from
      // breaking the client bundle with Node.js built-in references.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        os: false,
        zlib: false,
      };
    }
    return config;
  },
};

export default nextConfig;
