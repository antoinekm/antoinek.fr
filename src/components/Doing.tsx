"use client";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { forwardRef, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

import Progress from "./Progress";
import SpotifyLogo from "../assets/images/spotify-logo.svg";
import { doingAtom } from "../states/lanyard";
import { Presence } from "../types/lanyard";

import Link from "@/components/Link";

// Thanks to Tim (https://github.com/timcole/timcole.me/blob/%F0%9F%A6%84/components/lanyard.tsx) for the types

enum Operation {
  Event,
  Hello,
  Initialize,
  Heartbeat,
}

enum EventType {
  INIT_STATE = "INIT_STATE",
  PRESENCE_UPDATE = "PRESENCE_UPDATE",
}

type SocketEvent = {
  op: Operation;
  t?: EventType;
  d: Presence | unknown;
};

const logLanyardEvent = (eventName: string, data: any) => {
  // eslint-disable-next-line no-console
  console.log(
    `%cLanyard%c <~ ${eventName} %o`,
    "background-color: #d7bb87; border-radius: 5px; padding: 3px; color: #372910;",
    "background: none; color: #d7bb87;",
    data,
  );
};

const discordId = "623154662765232128";

const Doing = (
  { setActive, ...props }: { setActive: (active: boolean) => void } & any,
  ref: any,
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [doing, setDoing] = useAtom(doingAtom) as any;

  const send = (op: Operation, d?: unknown): void => {
    if (socket !== null) socket.send(JSON.stringify({ op, d }));
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (socket === null) return () => {};

    socket.onmessage = function ({ data }: MessageEvent): void {
      const { op, t, d }: SocketEvent = JSON.parse(data);

      if (op === Operation.Hello) {
        setInterval(
          () => send(Operation.Heartbeat),
          (d as { heartbeat_interval: number }).heartbeat_interval,
        );
        send(Operation.Initialize, { subscribe_to_id: discordId });
      } else if (op === Operation.Event && t) {
        logLanyardEvent(t, d);

        if ([EventType.INIT_STATE, EventType.PRESENCE_UPDATE].includes(t))
          setDoing(d as Presence);
      }
    };

    socket.onclose = () => {
      setSocket(null);
    };
  }, [send, setDoing, socket]);

  useEffect(() => {
    setIsMounted(true);
    if (!socket) setSocket(new WebSocket("wss://api.lanyard.rest/socket"));
  }, [socket]);

  const currentActivity = useMemo(
    () => doing?.activities.filter((activity) => activity.type === 0)[0],
    [doing],
  );

  useEffect(() => {
    setActive(doing?.listening_to_spotify || currentActivity);
  }, [doing, currentActivity, setActive]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || !doing || !doing?.discord_status) return null;

  const currentDate: any = new Date();

  return (
    <>
      {doing?.listening_to_spotify ? (
        <Container ref={ref} href={"/presence"} {...props}>
          <Title>
            {"Listening to Spotify "}
            <LiveDot />
          </Title>
          <>
            <ActivityRow>
              <ActivityImageContainer>
                <ActivityImage src={doing.spotify.album_art_url} />
                <ActivitySecondaryImage src={SpotifyLogo} />
              </ActivityImageContainer>

              <ActivityInfo>
                <span>{doing.spotify.song}</span>
                <p>
                  {"by "}
                  {doing.spotify.artist}
                </p>
              </ActivityInfo>
            </ActivityRow>
            <Progress
              percentage={
                (100 * (currentDate - doing.spotify.timestamps.start)) /
                (doing.spotify.timestamps.end - doing.spotify.timestamps.start)
              }
            />
          </>
        </Container>
      ) : null}
      {currentActivity ? (
        <Container href={"/presence"} {...props}>
          <Title>{"Doing something"}</Title>
          <ActivityRow>
            {currentActivity.assets ? (
              <ActivityImageContainer>
                <ActivityImage
                  src={`https://cdn.discordapp.com/app-assets/${currentActivity.application_id}/${currentActivity.assets.large_image}.png`}
                />
                <ActivitySecondaryImage
                  src={`https://cdn.discordapp.com/app-assets/${currentActivity.application_id}/${currentActivity.assets.small_image}.png`}
                />
              </ActivityImageContainer>
            ) : null}
            <ActivityInfo>
              <span>{currentActivity.name}</span>
              {currentActivity.details ? (
                <p>{currentActivity.details}</p>
              ) : null}
              {currentActivity.state ? <p>{currentActivity.state}</p> : null}
            </ActivityInfo>
          </ActivityRow>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled(motion.create(Link))`
  width: calc(100% + 2rem);
  margin-left: -2rem;
  background-color: transparent;
  color: #bdbdb2;
  border-top: 1px solid #30302b;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #30302b;
    color: #ffffe3;
  }
`;

const Title = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 0.8rem;
  color: rgb(189, 189, 178);
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 1;
  }

  100% {
    opacity: 0%;
  }
`;

const LiveDot = styled.div`
  display: inline-block;
  margin-left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff5252;
  animation: ${fadeInOut} 2s ease-in-out infinite;
`;

const ActivityRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActivityImageContainer = styled.div`
  position: relative;
  height: 50px;
`;

const ActivityImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
`;

const ActivitySecondaryImage = styled.img`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #10100e;
  border: 2px solid #30302b;
`;

const ActivityInfo = styled.div`
  margin-left: 1rem;

  span {
    color: #ffffe3;
    margin: 0;
    font-weight: 700;
    font-size: 0.8rem;
    color: #ffffe3;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
  }
`;

export default forwardRef(Doing);
