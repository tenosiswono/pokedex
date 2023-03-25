import Preloader from "@/components/Preloader";
import { render, screen } from "@testing-library/react";

describe("Preloader", () => {
  test("renders three preloader items", () => {
    render(<Preloader />);
    const preloaderItems = screen.getAllByTestId("preloader");
    expect(preloaderItems).toHaveLength(3);
  });
});
