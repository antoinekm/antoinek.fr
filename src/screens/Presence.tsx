"use client";

import PageWrapper from "../components/page-wrapper";

import Link from "@/components/Link";

const Presence = () => (
  <PageWrapper forceReadableWidth>
    <h1>{"👀 Presence"}</h1>
    <p>
      {
        "You may have noticed that while I'm doing something like listening to Spotify, programming in VSCode or playing a game, it'll appear in the bottom left of my site. This is thanks to an open-source project called "
      }
      <Link href={"https://github.com/phineas/lanyard"}>{"Lanyard"}</Link>
      {
        " which pulls live presences from Discord and updates an API and WebSocket service. It takes <10 seconds to set up, you just have to join a Discord server!"
      }
    </p>
  </PageWrapper>
);

export default Presence;
