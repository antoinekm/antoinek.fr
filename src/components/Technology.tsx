"use client";

import { ReactElement } from "react";
import styled from "styled-components";

export type TechnologyProps = {
  color: string;
  icon: ReactElement;
  name: string;
  type: string;
  useCase: string;
};

const Technology: React.FC<TechnologyProps> = ({
  color,
  icon,
  name,
  type,
  useCase,
}: TechnologyProps) => {
  return (
    <Container>
      <Head $color={color}>{icon}</Head>

      <Column $forceWidth={110}>
        <span>{"name"}</span>
        <p>{name}</p>
      </Column>
      <Column $forceWidth={200}>
        <span>{"type"}</span>
        <p>{type}</p>
      </Column>
      <Column $noBorder>
        <span>{"use case"}</span>
        <p>{useCase}</p>
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  border: 1px solid #30302b;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
  cursor: default;
  user-select: none;

  @media (max-width: 850px) {
    flex-direction: column;
    height: auto;
  }

  &:hover {
    background-color: #30302b;
  }
`;

const Head = styled.div<{ $color: string }>`
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: #ffffe3;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;

  @media (max-width: 850px) {
    height: 50px;
    width: 100%;
  }

  svg {
    height: 30px;
    width: 30px;
  }
`;

const Column = styled.div<{ $forceWidth?: number; $noBorder?: boolean }>`
  display: block;
  height: 100%;
  width: ${({ $forceWidth }) =>
    $forceWidth ? $forceWidth + "px" : "fit-content"};
  min-width: ${({ $forceWidth }) =>
    $forceWidth ? $forceWidth + "px" : undefined};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid
    ${({ $noBorder }) => ($noBorder ? "transparent" : "#30302b")};
  padding: 1rem;
  box-sizing: border-box;
  flex-shrink: ${({ $noBorder }) => ($noBorder ? undefined : 0)};

  @media (max-width: 850px) {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid
      ${({ $noBorder }) => ($noBorder ? "transparent" : "#30302b")};
    padding: 1rem;
    flex-shrink: 0;
    box-sizing: content-box;
  }

  span {
    font-family: "Panchang";
    margin: 0;
    color: #ffffe3;
  }

  p {
    margin: 0;
    white-space: normal;
  }
`;

export default Technology;
