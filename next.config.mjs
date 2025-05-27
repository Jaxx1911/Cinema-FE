/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'localhost',
        'placehold.co',
        'image.tmdb.org',
        'images.unsplash.com',
        'upload.wikimedia.org',
        'bucket-production-b6cd.up.railway.app',
      ],
    },
  };
  
  export default nextConfig;