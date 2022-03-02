import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from './styles/global';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyle />
  </BrowserRouter>,
  document.getElementById("root"),
);
