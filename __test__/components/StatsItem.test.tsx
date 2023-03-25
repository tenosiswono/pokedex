import React from "react";
import { render } from "@testing-library/react";
import StatsItem from "@/components/StatsItem";

describe("StatsItem", () => {
  it("renders the name and value with a progress bar", () => {
    const name = "HP";
    const value = 60;
    const color = "red";
    const max = 160;

    const { getByText, getByTestId } = render(
      <StatsItem name={name} value={value} color={color} max={max} />
    );

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(value.toString())).toBeInTheDocument();

    const progressBar = getByTestId("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle(`width: ${value / max * 100}%`);
    expect(progressBar).toHaveStyle(`background-color: ${color}`);
  });
});
