import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://portfolioikerg.vercel.app", lastModified: new Date() },
    { url: "https://portfolioikerg.vercel.app/writeups", lastModified: new Date() },
  ]
}
