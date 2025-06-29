"use client";

import PageWrapper from "../components/page-wrapper";

import Link from "@/components/Link";

const Etc = () => (
  <PageWrapper>
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
      <Link href={"https://www.linkedin.com/in/antoinekm/"}>
        {"click here"}
      </Link>{" "}
      {"to DM me on Linkedin."}
    </p>
    <p>
      {
        "Otherwise you can also send me a message or call me directly via my phone number "
      }
      <a href={"tel:+33699725358"}>{"+33 6 99 72 53 58"}</a>
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
