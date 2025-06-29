import compagnies from "src/data/compagnies";

import What from "@/screens/What";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: `Developer & Digital Creator at ${compagnies[0].name} and ${compagnies[1].name}`,
  description: `Learn about my work at ${compagnies[0].name} and ${compagnies[1].name}. Discover projects and passion for technology and digital creation.`,
});

export default function WhatPage() {
  return <What />;
}
