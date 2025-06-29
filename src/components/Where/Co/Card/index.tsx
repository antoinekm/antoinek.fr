"use client";

import { animated, useSpring } from "react-spring";
import { Compagny } from "src/types";
import styled from "styled-components";

import { ExternalLinkIcon } from "../../../Icons";

import Link from "@/components/Link";

interface Props {
  data: Compagny;
}

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 35,
  (x - window.innerWidth / 2) / 35,
  1.05,
];
const trans = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const CoCard: React.FC<Props> = ({
  data: { name, type, description, role, url, image },
}: Props) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 350, friction: 40 },
  }));

  return (
    <A href={url}>
      <Container
        onMouseMove={({
          clientX: x,
          clientY: y,
        }: {
          clientX: number;
          clientY: number;
        }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        // eslint-disable-next-line react/prop-types
        style={{ transform: props.xys.interpolate(trans) }}
      >
        <Header>
          <img
            alt={`${name} Logo`}
            draggable={false}
            src={image}
            height={70}
            width={70}
          />
          <div style={{ paddingLeft: "1rem" }}>
            <h3>
              {name} <ExternalLinkIcon />
            </h3>
            <span>{type}</span>
          </div>
        </Header>
        <Content>
          <h4>{"Role"}</h4>
          <p>{role}</p>
          <h4>{"What"}</h4>
          <p>{description}</p>
        </Content>
      </Container>
    </A>
  );
};

const A = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none !important;
  }
`;

const Container = styled(animated.div)`
  border: 1px solid #30302b;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;
  will-change: transform;
  transition: background-color 0.2s;
  height: 100%;

  &:hover {
    background-color: #30302b;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #30302b;
  padding: 1rem;
  /* box-sizing: border-box; */

  img {
    width: 70px;
    height: 70px;
    border-radius: 25%;
  }

  div {
    h3 {
      margin: 0;
    }

    svg {
      width: 15px;
      height: 15px;
      color: #bdbdb2;
    }

    span {
      color: #bdbdb2;
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
  box-sizing: border-box;
`;

export default CoCard;
