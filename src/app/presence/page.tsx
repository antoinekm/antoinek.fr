import Presence from "@/screens/Presence";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Live Presence",
  description:
    "See what Antoine Kingue is currently doing - live Discord status, Spotify activity, and real-time presence.",
});

export default function PresencePage() {
  return <Presence />;
}
