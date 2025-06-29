"use client";

import styled from "styled-components";

export const Button = styled.button`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border: 1px solid #30302b;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  transition: all 0.1s ease;
  will-change: transform;
  transition: background-color 0.2s;
  font-size: 14px;
  font-weight: 600;
  background: transparent;

  &:hover {
    background-color: #30302b;
    text-decoration: none !important;
  }
`;
