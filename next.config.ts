// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The remotePatterns array allows you to define a list of trusted external
    // domains for the Next.js Image component.
    remotePatterns: [
      {
        // For images from Unsplash (a popular source for high-quality photos)
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // Allows any path under this hostname
      },
      {
        // For images from Pexels (another great source for free stock photos)
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        // For images from Placeholder.com (useful for development)
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        // For user avatars from GitHub (if using GitHub for OAuth)
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        // For user avatars from GitHub (if using GitHub for OAuth)
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        // For user avatars from Google (if using Google for OAuth)
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // You can add more patterns here for any other image sources you use.
      // For example, if you were to use a CDN like Cloudinary:
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // }
    ],
  },
};

export default nextConfig;
