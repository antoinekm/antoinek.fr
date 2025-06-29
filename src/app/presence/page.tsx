import Link from "@/components/Link";
import PageWrapper from "@/components/page-wrapper";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Live Presence",
  description:
    "See what Antoine Kingue is currently doing - live Discord status, Spotify activity, and real-time presence.",
});

export default function PresencePage() {
  return (
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
}
