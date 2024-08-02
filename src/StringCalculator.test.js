import { render, fireEvent } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("StringCalculator", () => {
  it("returns 0 for an empty string", () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    const input = getByPlaceholderText("Enter numbers");
    const button = getByText("Calculate");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(getByText("Sum: 0")).toBeInTheDocument();
  });

  it("returns the sum of comma-separated numbers", () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    const input = getByPlaceholderText("Enter numbers");
    const button = getByText("Calculate");

    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.click(button);

    expect(getByText("Sum: 6")).toBeInTheDocument();
  });

  it("handles newlines as delimiters", () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    const input = getByPlaceholderText("Enter numbers");
    const button = getByText("Calculate");

    fireEvent.change(input, { target: { value: "1\n2,3" } });
    fireEvent.click(button);

    expect(getByText("Sum: 6")).toBeInTheDocument();
  });

  it("handles custom delimiters", () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    const input = getByPlaceholderText("Enter numbers");
    const button = getByText("Calculate");

    fireEvent.change(input, { target: { value: "//;\n1;2" } });
    fireEvent.click(button);

    expect(getByText("Sum: 3")).toBeInTheDocument();
  });

  it("ignores invalid numbers", () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    const input = getByPlaceholderText("Enter numbers");
    const button = getByText("Calculate");

    fireEvent.change(input, { target: { value: "1,2,foo,3" } });
    fireEvent.click(button);

    expect(getByText("Sum: 6")).toBeInTheDocument();
  });
});
