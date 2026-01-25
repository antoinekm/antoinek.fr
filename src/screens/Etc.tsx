import Link from "@components/Link";
import { NextSeo } from "next-seo";
import { PERSONAL } from "src/data/personal";

import PageWrapper from "../components/PageWrapper";

const Etc = () => (
  <PageWrapper>
    <NextSeo
      title={"Contact for development projects & collaborations"}
      description={
        "Get in touch for collaboration, questions, or opportunities. Connect via LinkedIn or direct contact methods for web development projects."
      }
    />

    <h1>{"/etc"}</h1>
    <h2>{"🤝 Thanks"}</h2>
    <p>{"Thanks for visiting. I hope you enjoyed your stay."}</p>
    <p>
      {"I did a complete rework of the basic "}
      <Link href={"https://github.com/phineas/phineas.io"}>
        {"phineas/phineas.io"}
      </Link>
      {
        " site from React to Next.js and by improving each components, thank you to him for this wonderful design and example which saved me a lot of time."
      }
    </p>
    <p>
      {"The source code for this website is available at "}
      <Link href={"https://github.com/antoinekm/antoinek.fr"}>
        {"antoinekm/antoinek.fr"}
      </Link>
      {"."}
    </p>
    <h2>{"📧 Contact"}</h2>
    <p>
      {"I'm most responsive through Linkedin DMs, you can "}
      <Link href={PERSONAL.sameAs.linkedin}>{"click here"}</Link>{" "}
      {"to DM me on Linkedin."}
    </p>
    <p>
      {
        "Otherwise you can also send me a message or call me directly via my phone number "
      }
      <a href={`tel:${PERSONAL.phone}`}>{PERSONAL.phone}</a>
    </p>
    <h2>{"🧭 Other"}</h2>
    <ul>
      <li>
        <Link href={"/presence"}>{"/presence"}</Link>
      </li>
      <li>
        <a href={"https://onruntime.com"}>{"onRuntime Studio"}</a>
      </li>
    </ul>
  </PageWrapper>
);

export default Etc;
