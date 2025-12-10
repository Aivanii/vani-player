import { render, screen } from "@testing-library/react";

describe("button", () => {
  test("button check", () => {
    render(<button>Test</button>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
