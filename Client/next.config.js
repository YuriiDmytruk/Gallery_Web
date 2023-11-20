/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.panda.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'helpx.adobe.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.simplilearn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.shutterstock.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'beingselfish.in',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd3nn873nee648n.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.gettyimages.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
