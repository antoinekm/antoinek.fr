import Where from "@/screens/Where";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Where I've Worked",
  description:
    "Explore Antoine Kingue's professional experience, companies, and educational background in web development.",
});

export default function WherePage() {
  return <Where />;
}
