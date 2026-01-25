import { useRouter } from "next/router";
import { DefaultSeo, LogoJsonLd } from "next-seo";

import { PERSONAL } from "../constants/personal";
import { certifications } from "../data/certifications";
import compagnies from "../data/compagnies";
import { technologies } from "../data/technologies";

const Head = () => {
  const router = useRouter();
  const websiteUrl = PERSONAL.url;
  const url = new URL(`${websiteUrl}${router.asPath}`);
  const params = new URLSearchParams(url.search);
  const pageToken = params.get("pageToken");

  url.hash = "";
  if (pageToken) {
    url.search = `?pageToken=${pageToken}`;
  } else {
    url.search = "";
  }

  const currentEmployer = compagnies[0];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${websiteUrl}/#person`,
    name: PERSONAL.name,
    givenName: "Antoine",
    familyName: "Kingue",
    url: websiteUrl,
    image: `${PERSONAL.url}${PERSONAL.image}`,
    description: PERSONAL.description,
    email: PERSONAL.email,
    telephone: PERSONAL.phone,
    birthDate: PERSONAL.birthDate,
    birthPlace: {
      "@type": "Place",
      name: PERSONAL.birthPlace.name,
      address: {
        "@type": "PostalAddress",
        ...PERSONAL.birthPlace.address,
      },
    },
    nationality: {
      "@type": "Country",
      name: "France",
    },
    jobTitle: PERSONAL.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: currentEmployer.name,
      url: currentEmployer.url,
    },
    knowsAbout: technologies.map((tech) => ({
      "@type": "Thing",
      name: tech.name,
      description: tech.useCase,
    })),
    hasCredential: certifications.slice(0, 10).map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "certification",
      recognizedBy: {
        "@type": "Organization",
        name: cert.subtitle || cert.location,
      },
      dateCreated: cert.year,
    })),
    sameAs: Object.values(PERSONAL.sameAs),
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Need for School by CCI Normandie",
        url: "https://needfor-school.com",
      },
    ],
  };

  return (
    <>
      <script
        type={"application/ld+json"}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <LogoJsonLd logo={PERSONAL.image} url={websiteUrl} />

      <DefaultSeo
        title={PERSONAL.name}
        description={`${PERSONAL.name}: ${PERSONAL.description}`}
        canonical={url.href}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: url.href,
          site_name: PERSONAL.name,
          images: [
            {
              url: "/static/images/open-graph.jpg",
              width: 1500,
              height: 500,
              alt: PERSONAL.name,
            },
          ],
        }}
        twitter={{
          handle: PERSONAL.twitter,
          site: PERSONAL.twitter,
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "theme-color",
            content: "#10100e",
          },
          {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/static/images/favicons/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/static/images/favicons/favicon.png",
          },
        ]}
        titleTemplate={`%s | ${PERSONAL.name}`}
      />
    </>
  );
};

export default Head;
