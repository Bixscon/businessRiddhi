/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@google-cloud/storage"],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        child_process: false,
        fs: false,
        os: false,
        path: false,
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-custom-header",
            value: "custom value",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "protoforge.in" },
      { protocol: "https", hostname: "archive.org" },
      { protocol: "https", hostname: "drive.google.com" },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/visey-opportunity-banner-uploads/**",
      },
      { protocol: "https", hostname: "**.imagekit.io" },
    ],
  },
};

export default nextConfig;