import Chat from "@/screens/Chat";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Developer, designer & youtuber based in Rouen, France",
  description:
    "Connect with a skilled developer specializing in TypeScript, React and digital design. Ask questions about projects, experience, and expertise.",
});

export default function HomePage() {
  return <Chat />;
}
