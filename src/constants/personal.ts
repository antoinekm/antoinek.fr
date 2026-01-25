const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://antoinek.fr";

export const PERSONAL = {
  name: "Antoine Kingue",
  birthDate: "2001-03-10",
  birthPlace: {
    name: "Paris 12e",
    address: {
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "France",
    },
  },
  nationality: "French",
  jobTitle: "R&D Developer",
  description: "Developer, designer and youtuber",
  email: "contact@antoinek.fr",
  phone: "+33699725358",
  url: APP_URL,
  image: "/static/images/antoine-kingue.jpg",
  twitter: "@AntoineKingue",
  sameAs: {
    linkedin: "https://linkedin.com/in/antoinekm",
    github: "https://github.com/antoinekm",
    x: "https://x.com/AntoineKingue",
    youtube: "https://www.youtube.com/@orionmood",
  },
};
