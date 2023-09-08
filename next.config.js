/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.images = {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "i.waifu.pics",
        },
        {
            protocol: "https",
            hostname: "cdn.waifu.im",
        },
        {
            protocol: "https",
            hostname: "nekos.best",
        },
        {
            protocol: "https",
            hostname: "catboys.com",
        },
    ],
};

module.exports = nextConfig;
