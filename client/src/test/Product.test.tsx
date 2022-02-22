import { render, screen } from "@testing-library/react";
import ProductListCard from "../components/ProductListCard";

describe("ProductListCard", () => {
  it("Product List Card", () => {
    const product = {
      id: 1645426258567,
      name: "냉면용기(대)",
      price: 83700,
      imageUrl: "https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg",
    };

    render(<ProductListCard {...product} />);

    const productCard = screen.getByText(product.name);
    expect(productCard).not.toBeNull();
  });
});
