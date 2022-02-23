import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import ProductListCard from "../components/ProductListCard";
import { theme } from "../assets/styles/theme";

describe("ProductListCard", () => {
  test("Product List Card", () => {
    const product = {
      id: 1645426258567,
      name: "냉면용기(대)",
      price: 83700,
      imageUrl: "https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg",
    };

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ProductListCard {...product} />
        </ThemeProvider>
      </BrowserRouter>
    );

    const productCard = screen.getByText(product.name);
    expect(productCard).not.toBeNull();
  });
});
