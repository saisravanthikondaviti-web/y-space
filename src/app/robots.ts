import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
      ],
    },

    sitemap: "https://vaispace.com/sitemap.xml",

    host: "https://vaispace.com",
  };
}