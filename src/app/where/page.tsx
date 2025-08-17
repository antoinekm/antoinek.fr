import Co from "@/components/Where/Co";
import Diplomas from "@/components/Where/Diplomas";
import Repo from "@/components/Where/Repo";
import PageWrapper from "@/components/page-wrapper";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Where I've Worked",
  description:
    "Explore Antoine Kingue's professional experience, companies, and educational background in web development.",
});

export default function WherePage() {
  return (
    <PageWrapper>
      <h1>{"📍 where I've done it"}</h1>
      <Co />
      <Diplomas />
      <Repo />
    </PageWrapper>
  );
}
