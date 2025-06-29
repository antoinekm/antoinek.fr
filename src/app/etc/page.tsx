import Etc from "@/screens/Etc";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Contact & More",
  description:
    "Get in touch with Antoine Kingue and discover additional information about his projects and services.",
});

export default function EtcPage() {
  return <Etc />;
}
