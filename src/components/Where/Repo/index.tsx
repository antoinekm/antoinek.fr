import React from "react";

import Link from "@/components/Link";

const Repo: React.FC = () => {
  return (
    <>
      <h2>{"☕ Open-source Projects"}</h2>
      <p>
        <Link href={"https://github.com/AntoineKM"}>
          {"See all my contributions to the open source"}
        </Link>
      </p>
    </>
  );
};

export default Repo;
