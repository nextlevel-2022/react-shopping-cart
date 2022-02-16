import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  body {
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', Sans-serif;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

export default GlobalStyles;
