"use client";

import { useState } from "react";
import { certifications } from "src/data/certifications";
import { diplomas } from "src/data/diplomas";
import styled from "styled-components";

const Diplomas = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredCertIndex, setHoveredCertIndex] = useState<number | null>(null);

  return (
    <Container>
      <h2>{"🎓 Education & Certifications"}</h2>
      <Description>
        {
          "Education and certifications are important to me, they are the proof of my knowledge and my ability to learn, adapt to new technologies and achieve my goals."
        }
      </Description>

      <SubSection>
        <SubTitle>{`Diplomas ${diplomas.length > 0 && ` (${diplomas.length})`}`}</SubTitle>
        <TimelineContainer>
          <VerticalLine />
          <Timeline>
            {diplomas.map((diploma, index) => (
              <TimelineItem
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Year>
                  {diploma.year.includes("-") ? (
                    <>
                      <YearText>{diploma.year.split("-")[1]}</YearText>
                      <YearSeparator />
                      <YearText>{diploma.year.split("-")[0]}</YearText>
                    </>
                  ) : (
                    <YearText>{diploma.year}</YearText>
                  )}
                </Year>
                <Dot $isHovered={hoveredIndex === index} />
                <Content $isHovered={hoveredIndex === index}>
                  <TitleRow>
                    <Icon>{diploma.icon}</Icon>
                    <Title>{diploma.title}</Title>
                  </TitleRow>
                  {diploma.subtitle && <Subtitle>{diploma.subtitle}</Subtitle>}
                  {diploma.location && <Location>{diploma.location}</Location>}
                </Content>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>
      </SubSection>

      <SubSection>
        <SubTitle>{`Certifications ${certifications.length > 0 && ` (${certifications.length})`}`}</SubTitle>
        <TimelineContainer>
          <VerticalLine />
          <Timeline>
            {certifications.map((cert, index) => (
              <TimelineItem
                key={index}
                onMouseEnter={() => setHoveredCertIndex(index)}
                onMouseLeave={() => setHoveredCertIndex(null)}
              >
                <Year>
                  {cert.year.includes("-") ? (
                    <>
                      <YearText>{cert.year.split("-")[1]}</YearText>
                      <YearSeparator />
                      <YearText>{cert.year.split("-")[0]}</YearText>
                    </>
                  ) : (
                    <YearText>{cert.year}</YearText>
                  )}
                </Year>
                <Dot $isHovered={hoveredCertIndex === index} />
                <Content $isHovered={hoveredCertIndex === index}>
                  <TitleRow>
                    <Icon>{cert.icon}</Icon>
                    <Title>{cert.title}</Title>
                  </TitleRow>
                  {cert.subtitle && <Subtitle>{cert.subtitle}</Subtitle>}
                  {cert.location && <Location>{cert.location}</Location>}
                </Content>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>
      </SubSection>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    margin-bottom: 2rem;
  }
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const SubSection = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubTitle = styled.h3`
  color: #ffffe3;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  margin-left: 4rem;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #30302b;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 1.5rem;
`;

const Year = styled.div`
  position: absolute;
  right: calc(100% + 1rem);
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const YearText = styled.span`
  color: #bdbdb2;

  &:last-child {
    color: #ffffe3;
  }
`;

const YearSeparator = styled.div`
  width: 1px;
  height: 0.5rem;
  background-color: #30302b;
  margin: 0 auto;
`;

const Dot = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid ${({ $isHovered }) => ($isHovered ? "#ffffe3" : "#30302b")};
  background-color: ${({ $isHovered }) => ($isHovered ? "#ffffe3" : "#10100e")};
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  z-index: 0;
  top: 50%;
`;

const Content = styled.div<{ $isHovered: boolean }>`
  margin-left: 2rem;
  transform: translateX(${({ $isHovered }) => ($isHovered ? "0.5rem" : "0")});
  transition: transform 0.2s ease;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const Icon = styled.span`
  font-size: 1.25rem;
`;

const Title = styled.h4`
  color: #ffffe3;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #bdbdb2;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
`;

const Location = styled.p`
  color: #bdbdb2;
  font-size: 0.875rem;
  margin: 0;
`;

export default Diplomas;
