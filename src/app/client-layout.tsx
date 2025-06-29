"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled, { StyleSheetManager } from "styled-components";
import { useLocalStorage } from "usehooks-ts";

import { ChevronsRight } from "@/components/Icons";
import Nav from "@/components/Nav";
import GlobalStyle from "@/components/global-style";
import SuccessiveType from "@/components/successive-type";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introCompleted, setIntroCompleted] = useLocalStorage(
    "v1:intro-completed",
    false,
  );

  // Prevent hydration mismatch by using consistent initial state
  const [introEnded, setIntroEnded] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [windowHeight, setWindowHeight] = React.useState(0);
  const introEndedInitially = React.useRef(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Set introEnded based on localStorage after mounting to prevent hydration mismatch
    setIntroEnded(introCompleted);
    introEndedInitially.current = introCompleted;

    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, [introCompleted]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.keyCode === 9 || e.which === 9) && !introEnded) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [introEnded]);

  const onIntroEnd = React.useCallback(() => {
    setIntroEnded(true);
    setIntroCompleted(true);
  }, [setIntroCompleted]);

  const mainContentInitialY = isMounted ? (introEnded ? 0 : windowHeight) : 0;
  const successiveTypeInitialY = 0;
  const successiveTypeAnimateY = isMounted && introEnded ? -windowHeight : 0;

  return (
    <StyleSheetManager enableVendorPrefixes>
      <GlobalStyle />
      <Wrapper $isMounted={isMounted}>
        <SuccessiveTypeContainer
          transition={{
            duration: introEndedInitially.current || !introCompleted ? 0 : 0.85,
          }}
          initial={{
            opacity: 0,
            y: successiveTypeInitialY,
          }}
          animate={{
            y: successiveTypeAnimateY,
            opacity: 1,
          }}
        >
          <ProgressContainer onClick={onIntroEnd}>
            <span>
              {"Skip intro "}
              <ChevronsRight />
            </span>
          </ProgressContainer>
          <SuccessiveType
            onEnd={onIntroEnd}
            words={
              "My future is yours, I develop for us simple but effective projects using a wide range of new bleeding edge technologies and languages."
            }
            userSkipped={introEnded}
          />
        </SuccessiveTypeContainer>

        <MainContent
          transition={{ duration: introEnded ? 0.85 : 0 }}
          initial={{
            y: mainContentInitialY,
          }}
          animate={{
            y: introEnded ? 0 : windowHeight,
          }}
        >
          <Nav />
          <ContentWrapper>
            <AnimatePresence>{children}</AnimatePresence>
          </ContentWrapper>
        </MainContent>
      </Wrapper>
    </StyleSheetManager>
  );
}

const Wrapper = styled.div<{ $isMounted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  opacity: ${({ $isMounted }) => ($isMounted ? 1 : 0)};
  transition: opacity 0.2s ease;

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }
`;

const SuccessiveTypeContainer = styled(motion.div)`
  width: 65ch;
  height: 350px;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const ProgressContainer = styled.div`
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: bold;

  svg {
    vertical-align: middle;
    height: 19px;
  }

  &:hover {
    color: #ffffe3;
  }
`;

const MainContent = styled(motion.div)`
  height: 100vh;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  overflow-y: auto;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  margin-left: 15rem;
  padding: 2rem;
  width: calc(100% - 15rem);
  box-sizing: border-box;
  font-size: 1rem;
  transition: all 0.2s;

  & [data-no-padding="true"] {
    margin: -2rem;
    width: calc(100% + 4rem);
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 850px) {
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
    padding-top: 65px;

    & [data-no-padding="true"] {
      margin: -2rem;
      margin-top: -65px;
      width: calc(100% + 4rem);
    }
  }
`;
