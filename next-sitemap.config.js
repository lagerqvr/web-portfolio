/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://lagerqvr.com',
    generateRobotsTxt: true,
    exclude: ['/404'],
}