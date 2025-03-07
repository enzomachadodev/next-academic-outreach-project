import { Metadata } from "next";

import { env } from "@/config/env";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl,
      images: `${baseUrl}/og.png`,
      siteName: env.APP_NAME,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@enzomachadodev",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: `${baseUrl}/og.png`,
      ...override.twitter,
    },
  };
}

const baseUrl = env.BASE_URL;
