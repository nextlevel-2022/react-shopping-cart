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

  @media only screen and (max-width: 768px) {
    body {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 10px;
    }
  }
`;

export default GlobalStyles;
