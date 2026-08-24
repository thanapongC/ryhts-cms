/**
 * OG Image Generation Utility
 * Generates dynamic Open Graph images for products and articles
 */

import satori from "satori";
import { resvg } from "@resvg/resvg-js";

interface OgImageOptions {
  title: string;
  subtitle?: string;
  type?: "product" | "article" | "default";
  brand?: string;
  category?: string;
  image?: string;
}

// Brand colors
const COLORS = {
  primary: "#017fe4",
  primaryDark: "#015cb0",
  white: "#ffffff",
  textLight: "rgba(255,255,255,0.85)",
  bg: "#f8fbff",
};

/**
 * Generate an OG image as PNG buffer
 */
export async function generateOgImage(options: OgImageOptions): Promise<Buffer> {
  const {
    title,
    subtitle = "",
    type = "default",
    brand = "Ryhts Ribbon",
    category = "",
  } = options;

  // Truncate title if too long
  const maxTitleLength = 40;
  const displayTitle = title.length > maxTitleLength 
    ? title.substring(0, maxTitleLength) + "..." 
    : title;

  // Type badge colors
  const badgeColors: Record<string, string> = {
    product: "#10b981",
    article: "#8b5cf6",
    default: COLORS.primary,
  };

  const badgeColor = badgeColors[type] || COLORS.primary;
  const badgeLabel = type === "product" ? "สินค้า" : type === "article" ? "บทความ" : "";

  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          // Background gradient
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              },
            },
          },
          // Decorative circles
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: -100,
                right: -100,
                width: 400,
                height: 400,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: -150,
                left: -50,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              },
            },
          },
          // Content container
          {
            type: "div",
            props: {
              children: [
                // Header with logo and badge
                {
                  type: "div",
                  props: {
                    children: [
                      // Logo placeholder
                      {
                        type: "div",
                        props: {
                          children: [
                            {
                              type: "div",
                              props: {
                                children: "R",
                                style: {
                                  fontSize: 24,
                                  fontWeight: "bold",
                                  color: COLORS.white,
                                },
                              },
                            },
                          ],
                          style: {
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          children: brand,
                          style: {
                            fontSize: 28,
                            fontWeight: "bold",
                            color: COLORS.white,
                            marginLeft: 16,
                          },
                        },
                      },
                    ],
                    style: {
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 40,
                    },
                  },
                },
                // Badge (if applicable)
                badgeLabel
                  ? {
                      type: "div",
                      props: {
                        children: badgeLabel,
                        style: {
                          display: "inline-block",
                          padding: "8px 16px",
                          borderRadius: 20,
                          background: badgeColor,
                          color: COLORS.white,
                          fontSize: 16,
                          fontWeight: "600",
                          marginBottom: 20,
                        },
                      },
                    }
                  : null,
                // Category (if applicable)
                category
                  ? {
                      type: "div",
                      props: {
                        children: category,
                        style: {
                          fontSize: 18,
                          color: COLORS.textLight,
                          marginBottom: 12,
                        },
                      },
                    }
                  : null,
                // Title
                {
                  type: "div",
                  props: {
                    children: displayTitle,
                    style: {
                      fontSize: 52,
                      fontWeight: "bold",
                      color: COLORS.white,
                      lineHeight: 1.2,
                      marginBottom: subtitle ? 16 : 0,
                      maxWidth: 900,
                    },
                  },
                },
                // Subtitle (if applicable)
                subtitle
                  ? {
                      type: "div",
                      props: {
                        children: subtitle,
                        style: {
                          fontSize: 22,
                          color: COLORS.textLight,
                          maxWidth: 800,
                          lineHeight: 1.5,
                        },
                      },
                    }
                  : null,
              ],
              style: {
                position: "relative",
                padding: 60,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            },
          },
          // Bottom bar
          {
            type: "div",
            props: {
              children: [
                {
                  type: "div",
                  props: {
                    children: "ryhts-ribbon.com",
                    style: {
                      fontSize: 18,
                      color: "rgba(255,255,255,0.7)",
                    },
                  },
                },
              ],
              style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 60px",
                background: "rgba(0,0,0,0.2)",
              },
            },
          },
        ].filter(Boolean),
        style: {
          width: 1200,
          height: 630,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Arial",
          data: Buffer.from(""),
          style: "normal",
        },
      ],
    }
  );

  const resvgInstance = new resvg(svg);
  const pngData = resvgInstance.render();
  return pngData.asPng();
}

/**
 * Get OG image URL for a page
 */
export function getOgImageUrl(options: OgImageOptions & { baseUrl: string }): string {
  const { baseUrl, ...params } = options;
  const searchParams = new URLSearchParams();
  
  if (params.title) searchParams.set("title", params.title);
  if (params.subtitle) searchParams.set("subtitle", params.subtitle);
  if (params.type) searchParams.set("type", params.type);
  if (params.brand) searchParams.set("brand", params.brand);
  if (params.category) searchParams.set("category", params.category);

  return `${baseUrl}/api/og?${searchParams.toString()}`;
}
