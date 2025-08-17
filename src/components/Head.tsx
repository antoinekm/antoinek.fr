"use client";

import { env } from "env.mjs";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoJsonLd, OrganizationJsonLd, SocialProfileJsonLd } from "next-seo";

const Head = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const websiteUrl = env.NEXT_PUBLIC_APP_URL;
  const url = new URL(`${websiteUrl}${pathname}`);
  const pageToken = searchParams?.get("pageToken");

  url.hash = "";
  if (pageToken) {
    url.search = `?pageToken=${pageToken}`;
  } else {
    url.search = "";
  }

  return (
    <>
      <OrganizationJsonLd
        type={"Person"}
        logo={"https://antoinek.fr/static/images/favicons/favicon.png"}
        name={"Antoine Kingue"}
        url={websiteUrl}
        sameAs={[
          "https://linkedin.com/in/antoinekm",
          "https://github.com/AntoineKM",
          "https://x.com/AntoineKingue",
          "https://youtube.com/c/orionmood",
        ]}
      />

      <LogoJsonLd
        logo={"https://antoinek.fr/static/images/favicons/favicon.png"}
        url={websiteUrl}
      />

      <SocialProfileJsonLd
        type={"Person"}
        name={"Antoine Kingue"}
        url={websiteUrl}
        sameAs={[
          "https://linkedin.com/in/antoinekm",
          "https://github.com/AntoineKM",
          "https://x.com/AntoineKingue",
          "https://youtube.com/c/orionmood",
        ]}
      />
    </>
  );
};

export default Head;
