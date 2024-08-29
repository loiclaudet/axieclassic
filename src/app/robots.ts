import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/guilds"],
        disallow: ["/profile/", "/find-similar/"],
      },
    ],
    sitemap: "https://axieclassic.com/sitemap.xml",
  };
}
