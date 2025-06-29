"use client";

import compagnies from "src/data/compagnies";
import styled from "styled-components";

import CoCard from "./Card";

const Co: React.FC = () => {
  return (
    <>
      <h2>{`🏢 Companies (${compagnies.length})`}</h2>
      <Container>
        {compagnies.map((compagny) => (
          <CoCard key={compagny.name} data={compagny} />
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  width: 100%;
  gap: 2rem 2rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export default Co;
