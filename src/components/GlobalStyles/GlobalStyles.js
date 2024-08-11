import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --primary-color: #800000;
    --secondary-color: #982B1C;
    --tertiary-color: #DAD4B5;
    --side-color: #F2E8C6;
    --text-color: #000000;
    --text-color-2: #2C3531;
    --icon-color: none;
    --custom-image: url("https://www.transparenttextures.com/patterns/3px-tile.png");
    --custom-image-2: url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  

  html, body {
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);;
background-image: var(--custom-image);
    color: var(--text-color);
  }


`;
