"use client";

import Co from "@/components/Where/Co";
import Diplomas from "@/components/Where/Diplomas";
import Repo from "@/components/Where/Repo";
import PageWrapper from "@/components/page-wrapper";

const Where = () => {
  return (
    <PageWrapper>
      <h1>{"📍 where I've done it"}</h1>
      <Co />
      <Diplomas />
      <Repo />
    </PageWrapper>
  );
};

export default Where;
