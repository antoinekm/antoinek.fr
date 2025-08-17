"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100vh;
    display: block;
  }

  body {
    margin: 0;
    font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #10100e;
    color: #ffffe3;
    overflow: hidden;
    scrollbar-color: rgba(255, 255, 255, .6) #10100e;
  }

  ::selection {
    background-color: #bdbdb2;
    color: #10100e;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  a {
    color: #ffffe3;
    text-decoration: none;
    transition: all 0.2s;
  }

  button {
    font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    font-weight: 800;
  }

  p {
    color: #ffffe3;
  }

  p a, ul a {
    text-decoration: underline;
  }

  /* hover */
  p a:hover, li a:hover {
    filter: brightness(0.8);
  }

  /* scrollbar */
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #10100e;
  }

  ::-webkit-scrollbar-thumb {
    border: 1px solid #30302b;
    border-radius: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track-piece {
    height: 30px;
  }
`;

export default GlobalStyle;
