import { animated, useSpring } from "react-spring";
import { PERSONAL } from "src/data/personal";
import styled from "styled-components";

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 35,
  (x - window.innerWidth / 2) / 35,
  1.05,
];
const trans = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const VideoSkeleton = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 350, friction: 40 },
  }));

  return (
    <A href={PERSONAL.sameAs.youtube} target={"_blank"} rel={"noopener"}>
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
          <div />
        </Header>
        <Content>
          <div />
        </Content>
      </Container>
    </A>
  );
};

const A = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none !important;
  }

  @keyframes loading {
    0% {
      background-position: 0% 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0% 0;
    }
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

  div {
    height: 100%;
    width: 100%;
    background: #999999;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05),
      rgb(48, 48, 43),
      rgba(255, 255, 255, 0.1),
      rgb(48, 48, 43)
    );
    background-size: 400% 400%;
    animation: loading 5s ease infinite;
  }
`;

const Content = styled.div`
  padding: 1rem;
  box-sizing: border-box;

  div {
    height: 16px;
    border-radius: 99999px;
    background: #999999;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05),
      rgb(48, 48, 43),
      rgba(255, 255, 255, 0.1),
      rgb(48, 48, 43)
    );
    background-size: 400% 400%;
    animation: loading 5s ease infinite;
  }
`;

export default VideoSkeleton;
