import '@fontsource/sirin-stencil';
import '@fontsource/kaushan-script';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Smooth scrolling for browsers that support it */
  html.has-scroll-smooth {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;  
  }

  /* Reset styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base styles */
  body {
    font-family: "Sirin Stencil", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow-x: hidden;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-family: "Kaushan Script", cursive;
    font-weight: 400;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Locomotive Scroll adjustments */
  [data-scroll-container] {
    min-height: 100vh;
  }

  /* Debugging (uncomment when needed) */
  /* * {
    outline: 1px solid red !important;
  } */
`;

export default GlobalStyles;