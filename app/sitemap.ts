import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://faangcode.vercel.app"

  // Define all your static routes
  const routes = ["", "/login", "/signup", "/profile", "/settings", "/leaderboard", "/cheatsheets"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}
