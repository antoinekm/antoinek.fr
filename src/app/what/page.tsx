import compagnies from "src/data/compagnies";
import calculateAge from "src/utils/calculate-age";

import Link from "@/components/Link";
import PageWrapper from "@/components/page-wrapper";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: `Developer & Digital Creator at ${compagnies[0].name} and ${compagnies[1].name}`,
  description: `Learn about my work at ${compagnies[0].name} and ${compagnies[1].name}. Discover projects and passion for technology and digital creation.`,
});

export default function WhatPage() {
  return (
    <PageWrapper forceReadableWidth>
      <h1>{"🤔 what I do"}</h1>
      <p>{`Antoine, ${calculateAge(
        "2001-03-10",
      )} y/o developer, designer and youtuber.`}</p>
      <p>
        {
          "I'm based in Rouen and I'm a big fan of cars and motorcycles - a perfect balance to decompress after long coding sessions! I design, build and publish projects of quality and reliability."
        }
      </p>
      <p>
        {
          "My coding journey started at 11 years old when I created custom plugins for my Minecraft server in Java. This early passion for problem-solving through code naturally evolved into a professional career. Currently, I'm working in the R&D department at "
        }
        <Link href={"https://arkee.fr"}>{"Arkée"}</Link>
        {", co-founded "}
        <Link href={"https://onruntime.com"}>{"onRuntime Studio"}</Link>
        {" with friends, and building "}
        <Link href={"https://tonightpass.com"}>{"Tonight Pass"}</Link>
        {"."}
      </p>
      <p>
        {
          "In my free time, I make music as a DJ and post slow motion music on my Youtube Channel. I love bringing people together to create and have fun together! 🥳"
        }
      </p>

      <h2>{"About Arkée by Jaws"}</h2>
      <p>
        {
          "I work in Arkée's R&D department, where I wear multiple hats: developing internal tools that dramatically improve our workflow efficiency, and acting as a technical consultant to help resolve structural and performance problems for our clients."
        }
      </p>
      <p>
        {
          "Through automation and optimization, we've been able to deliver significant cost reductions and performance improvements for our clients. SEO was a vast universe I'd only skimmed during my studies, but joining Arkée allowed me to dive deep and create meaningful tools around it."
        }
      </p>
      <p>
        {
          "The expertise I've gained at Arkée has been invaluable for my own projects too - for example, applying SEO strategies to Tonight Pass helped it grow from 0 to 100k impressions in less than 3 months, just by working on it during weekends."
        }
      </p>

      <h2>{"About onRuntime Studio"}</h2>
      <p>
        {
          "In 2015, I co-founded onRuntime Studio with friends - a development and design agency focused on bringing projects and teams of creators together. Over the years, we've delivered dozens of projects, from web applications to mobile apps and complete digital experiences."
        }
      </p>
      <p>
        {
          "What started as a group of passionate friends wanting to create impactful digital solutions has grown into a recognized agency. We specialize in modern technologies and always aim to deliver solutions that make a real difference for our clients."
        }
      </p>

      <h2>{"About Tonight Pass"}</h2>
      <p>
        {`I often go out to nightclubs and parties, and I have seen that this world is not very technologically advanced. Most companies only think about pre-selling tickets for events, but in reality the organization of a party is much more complex.
Tonight Pass simplifies the whole organization: find your teams and DJs, create your parties, promote and sell in presale or on the spot, pay in groups, provide self-service kiosks and reduce your queues, set up loyalty programs, at the end collect authentic reviews and allow your customers to stay in touch with each other and with you.`}
      </p>
      <p>
        {
          "This platform represents the intersection of my technical expertise and real-world problem solving - using adaptive algorithms and modern web technologies to revolutionize how people discover and experience nightlife events."
        }
      </p>
    </PageWrapper>
  );
}
