import { act, fireEvent, render, screen } from "@testing-library/react";
import KeyboardHelpModal from "../../features/keyboardHelpModal/keyboardHelpModal";
import { runInAction } from "mobx";

describe("keyboard modal window", () => {
  it("no displaying when shouldRender equals false", () => {
    render(<KeyboardHelpModal shouldRenderProp={false} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-0");
    expect(modal).toHaveClass("scale-0");
  });

  it("display when shouldRender equals true", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
  });

  it("Escape set isDisplaying to false when user presses it", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
    act(() => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    });
    expect(modal).toHaveClass("opacity-0");
    expect(modal).toHaveClass("scale-0");
  });

  it("modal stays open when pressing any key except Escape", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
    act(() => {
      fireEvent.keyDown(document, { key: "Space" });
      fireEvent.keyDown(document, { key: "Enter" });
      fireEvent.keyDown(document, { key: "Tab" });
    });
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
  });

  it("keyboard modal button set shouldRender to true", () => {
    render(<KeyboardHelpModal shouldRenderProp={false} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-0");
    expect(modal).toHaveClass("scale-0");
    const keyboardBtn = screen.getByTestId("keyboardModalBtn");
    act(() => {
      fireEvent.click(keyboardBtn);
    });
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
  });

  it("keyboard modal close button set shouldRender to false", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
    const closeBtn = screen.getByTestId("keyboardModalCloseBtn");
    act(() => {
      fireEvent.click(closeBtn);
    });
    expect(modal).toHaveClass("opacity-0");
    expect(modal).toHaveClass("scale-0");
  });

  it("set isRender doesn't change when user clicks inside the modal window", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
    act(() => {
      fireEvent.click(modal.children[0]);
    });
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
  });

  it("set isRender sets to false user clicks outside the insides of the modal window", () => {
    render(<KeyboardHelpModal shouldRenderProp={true} />);
    const modal = screen.getByTestId("keyboardHelpModal");
    expect(modal).toHaveClass("opacity-100");
    expect(modal).toHaveClass("scale-100");
    act(() => {
      fireEvent.click(modal);
    });
    expect(modal).toHaveClass("opacity-0");
    expect(modal).toHaveClass("scale-0");
  });
});
