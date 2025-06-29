import How from "@/screens/How";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Technical skills & modern technologies for development",
  description:
    "I highly leverage new bleeding-edge technologies and languages like Typescript or Go to stay on top of the game.",
});

export default function HowPage() {
  return <How />;
}
