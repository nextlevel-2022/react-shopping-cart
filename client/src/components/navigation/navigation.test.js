import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "@components/navigation";
import { BrowserRouter } from "react-router-dom";

const MockNavigation = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

describe("<Navigation>", () => {
  it("show element texts correctly", () => {
    render(<MockNavigation />);

    screen.getByText("Clean Code Shop");
    screen.getByText("장바구니");
    screen.getByText("주문목록");
  });

  it("Move Correct URL by Navigation Linker Click", () => {
    render(<MockNavigation />);

    const $LinkToProductListButttonEl = screen.getByText("Clean Code Shop");
    const $LinkToCartButtonEl = screen.getByText("장바구니");
    const $LinkToOrderListButtonEl = screen.getByText("주문목록");

    fireEvent.click($LinkToCartButtonEl);
    expect(window.location.pathname).toEqual("/cart");

    fireEvent.click($LinkToOrderListButtonEl);
    expect(window.location.pathname).toEqual("/orderList");

    fireEvent.click($LinkToProductListButttonEl);
    expect(window.location.pathname).toEqual("/");
  });
});
