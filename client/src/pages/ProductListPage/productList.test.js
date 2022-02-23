import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import ProductListPage from "@/pages/ProductListPage";

describe("<ProductListPage>", () => {
  it("fetch rendering correctly", async () => {
    render(<ProductListPage />);

    expect(screen.findByText("냉면용기(대)"));
    expect(screen.findByText("손수 맛있는 쌀떡볶이떡 1kg"));
  });
});
