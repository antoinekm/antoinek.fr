const siteUrl = process.env.SITE_URL || "https://antoinek.fr";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
    transformRobotsTxt: async (_config, robotsTxt) => {
      return `${robotsTxt}\n# Content Signals\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n`;
    },
  },
};
