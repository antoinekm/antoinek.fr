import { Compagny } from "src/types";

const compagnies: Compagny[] = [
  {
    name: "Arkée by Jaws",
    type: "Agency",
    role: "R&D Developer",
    description:
      "I work in the R&D department developing internal tools and helping companies improve their SEO and performance.",
    url: "https://arkee.fr",
    image: "/static/images/arkee-icon.jpg",
  },
  {
    name: "Tonight Pass",
    type: "Booking service",
    role: "Founder & Developer",
    description: "A platform for nightlife events and parties",
    url: "https://tonightpass.com",
    image: "/static/images/tonightpass-icon.jpg",
    isFounder: true,
  },
  {
    name: "Expat Facilities",
    type: "Travel compagny",
    description: "I designed Expats Facilities to help people move abroad.",
    role: "CTO & Lead developer",
    url: "https://www.linkedin.com/company/expatfacilities",
    image: "/static/images/expatsfacilities-icon.jpeg",
  },
  {
    name: "Challenge For Earth",
    type: "Consumer social",
    description:
      "I had the honor of being able to create a social hub that educates people about ecology, here I was able to gain experience both back and front.",
    role: "Developer",
    url: "https://www.linkedin.com/company/challengeforearth",
    image: "/static/images/challengeforearth-icon.png",
  },
  {
    name: "Need for School by CCI Normandie",
    type: "Digital school",
    description:
      "I decided to join this school to learn good practices, create a network of developers and acquire a diploma that confirms my skills.",
    role: "Student & Developer",
    url: "https://needfor-school.com",
    image: "/static/images/needforschool-icon.jpeg",
    isSchool: true,
  },
  {
    name: "onRuntime",
    type: "Creative studio",
    description:
      "I co-founded onRuntime in 2015 with friends to bring projects and teams of creators together.",
    role: "Co-founder & Developer",
    url: "https://onruntime.com",
    image: "/static/images/onruntime-icon.jpg",
    isFounder: true,
  },
  {
    name: "Air France",
    type: "Travel compagny",
    description:
      "I discovered the IT sector of Air France at Orly, where I was able to study and analyze the network and participate in meetings to implement new technologies on board the company's planes.",
    role: "Trainee",
    url: "https://wwws.airfrance.fr/",
    image: "/static/images/airfrance-icon.png",
  },
];

export default compagnies;
