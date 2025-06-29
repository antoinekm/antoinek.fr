"use client";

import Link from "next/link";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 35,
  (x - window.innerWidth / 2) / 35,
  1.05,
];
const trans = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Video = ({
  url,
  title,
  thumbnailUrl,
}: {
  url: string;
  title: string;
  thumbnailUrl: string;
}) => {
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
            alt={title}
            draggable={false}
            src={thumbnailUrl}
            height={150}
            width={275}
          />
        </Header>
        <Content>
          <h3>{title}</h3>
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
  overflow: hidden;

  &:hover {
    background-color: #30302b;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 150px;
  border-bottom: 1px solid #30302b;
  /* box-sizing: border-box; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  h3 {
    font-size: 16px;
    margin: 0;
  }
`;

export default Video;
