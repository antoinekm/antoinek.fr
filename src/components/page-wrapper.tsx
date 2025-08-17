"use client";

import { motion } from "framer-motion";
import React from "react";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export type PageWrapperProps = {
  forceReadableWidth?: boolean;
  noPadding?: boolean;
} & React.PropsWithChildren;

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  forceReadableWidth,
  noPadding,
}: PageWrapperProps) => {
  return (
    <motion.div
      initial={"initial"}
      animate={"in"}
      exit={"out"}
      variants={pageVariants}
      transition={pageTransition}
      data-no-padding={noPadding ? "true" : undefined}
      style={{
        maxWidth: forceReadableWidth ? "65ch" : undefined,
        minWidth: 0,
        paddingBottom: noPadding ? "0" : "2rem",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
