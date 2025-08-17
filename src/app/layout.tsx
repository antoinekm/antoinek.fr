import { env } from "env.mjs";
import { Metadata } from "next";

import ClientLayout from "./client-layout";
import StyledComponentsRegistry from "./styled-components-registry";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Antoine Kingue",
    template: "%s | Antoine Kingue",
  },
  description: "Antoine Kingue: developer, designer and youtuber",
  icons: {
    icon: "/static/images/favicons/favicon.ico",
    apple: "/static/images/favicons/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_APP_URL,
    siteName: "Antoine Kingue",
    images: [
      {
        url: "/static/images/open-graph.jpg",
        width: 1500,
        height: 500,
        alt: "Antoine Kingue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AntoineKingue",
    creator: "@AntoineKingue",
  },
  other: {
    "theme-color": "#10100e",
  },
};

export const viewport =
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"} suppressHydrationWarning>
      <head>
        <meta charSet={"utf-8"} />

        {/* Preconnect */}
        <link
          rel={"preconnect"}
          href={"https://api.fontshare.com"}
          crossOrigin={"anonymous"}
        />

        <link
          rel={"stylesheet"}
          href={
            "https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&f[]=panchang@400&display=swap"
          }
        />

        {/* Analytics */}
        <script
          defer
          src={"https://analytics.eu.umami.is/script.js"}
          data-website-id={"0aa1be33-7fae-4cd7-9418-af9aafbb04ee"}
        />
      </head>
      <body suppressHydrationWarning>
        <div id={"__next"} suppressHydrationWarning>
          <StyledComponentsRegistry>
            <ClientLayout>{children}</ClientLayout>
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  );
}
