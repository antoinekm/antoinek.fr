import { technologies } from "src/data/technologies";

import Link from "@/components/Link";
import Technology from "@/components/Technology";
import PageWrapper from "@/components/page-wrapper";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Technical skills & modern technologies for development",
  description:
    "I highly leverage new bleeding-edge technologies and languages like Typescript or Go to stay on top of the game.",
});

export default function HowPage() {
  return (
    <PageWrapper>
      <h1>{"💻 how I do it"}</h1>
      <p>
        {
          "I highly leverage new bleeding-edge technologies and languages like\r"
        }
        {
          "Typescript or Go to stay on top of the game. You can find a list of my\r"
        }
        {"most-used technologies below.\r"}
      </p>

      <>
        {technologies.map(({ color, icon: Icon, name, type, useCase }) => (
          <Technology
            key={name}
            color={color}
            icon={<Icon />}
            name={name}
            type={type}
            useCase={useCase}
          />
        ))}
      </>

      {/* <Technology
        color="#9c1fa5"
        icon={<ElixirLogo/>}
        name="Elixir"
        type="Realtime, Backend"
        useCase={
          "Building fault-tolerant realtime systems that scale out across multiple nodes"
        }
      /> */}

      {/* <Technology
        color="#FF6600"
        icon={<RabbitMQLogo/>}
        name="RabbitMQ"
        type="Message queue"
        useCase={
          "Messaging between different services in a robust & durable way"
        }
      /> */}
      <p>
        <Link href={"https://wakatime.com/@antoinekm"}>
          {"See all my statistics since March 03, 2021."}
        </Link>
      </p>
    </PageWrapper>
  );
}
