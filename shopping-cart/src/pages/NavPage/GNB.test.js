import { fireEvent, getByTestId } from "@testing-library/react";
import React from "react";
import { render } from "react-dom"
import GNB from "./GNB"

describe("GNB test", async () => {
  const component = render(<GNB />);
  fireEvent.click(getByTestId("logo"))

  await wait();
  expect(getByTestId("product-container")).toBeInTheDocument();

})

// Cannot find module 'react' from '../node_modules/react-router-dom/umd/react-router-dom.development.js'
// error로 테스트 못함... 찾는중...