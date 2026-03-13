import { useRouter } from "next/router";
import { DefaultSeo, LogoJsonLd } from "next-seo";
import { Organization, Person, WithContext } from "schema-dts";

import { certifications } from "../data/certifications";
import compagnies from "../data/compagnies";
import { PERSONAL } from "../data/personal";
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

  // Separate work positions, schools and founded companies
  const workPositions = compagnies.filter((c) => !c.isSchool);
  const schools = compagnies.filter((c) => c.isSchool);
  const foundedCompanies = compagnies.filter((c) => c.isFounder);

  const personJsonLd: WithContext<Person> = {
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
    gender: "Male",
    jobTitle: ["Developer", "Designer", "YouTuber"],
    knowsLanguage: ["fr", "en", "de"],
    homeLocation: {
      "@type": "Place",
      name: "Rouen, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rouen",
        addressRegion: "Normandie",
        addressCountry: "France",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "R&D Developer",
      occupationLocation: {
        "@type": "Country",
        name: "France",
      },
    },
    memberOf: {
      "@type": "Organization",
      name: "onRuntime",
      url: "https://onruntime.com",
    },
    skills: technologies.map((tech) => tech.name),
    worksFor: workPositions.map((company) => ({
      "@type": "Organization",
      name: company.name,
      url: company.url,
    })),
    knowsAbout: technologies.map((tech) => ({
      "@type": "Thing",
      name: tech.name,
      description: tech.useCase,
    })),
    hasCredential: certifications.map((cert) => ({
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
    alumniOf: schools.map((school) => ({
      "@type": "EducationalOrganization",
      name: school.name,
      url: school.url,
    })),
  };

  const organizationsJsonLd: WithContext<Organization>[] = foundedCompanies.map(
    (company) => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      name: company.name,
      url: company.url,
      logo: `${websiteUrl}${company.image}`,
      founder: {
        "@type": "Person",
        "@id": `${websiteUrl}/#person`,
      },
    }),
  );

  return (
    <>
      <script
        type={"application/ld+json"}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {organizationsJsonLd.map((org) => (
        <script
          key={org["@id"] as string}
          type={"application/ld+json"}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
      ))}

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
