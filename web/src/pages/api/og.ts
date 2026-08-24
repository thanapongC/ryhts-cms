/**
 * API Endpoint for Dynamic OG Image Generation
 * GET /api/og?title=...&subtitle=...&type=product|article|default&brand=...&category=...
 */

import type { APIRoute } from "astro";
import { generateOgImage } from "../../lib/og";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const title = searchParams.get("title") || "Ryhts Ribbon";
    const subtitle = searchParams.get("subtitle") || "";
    const type = (searchParams.get("type") as "product" | "article" | "default") || "default";
    const brand = searchParams.get("brand") || "Ryhts Ribbon";
    const category = searchParams.get("category") || "";

    const pngBuffer = await generateOgImage({
      title,
      subtitle,
      type,
      brand,
      category,
    });

    return new Response(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("OG Image generation error:", error);
    
    // Return a fallback error image or redirect to default
    return new Response("Error generating image", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
