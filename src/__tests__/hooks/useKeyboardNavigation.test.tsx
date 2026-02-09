import { render, renderHook } from "@testing-library/react";
import { useKeyboardNavigation } from "../../providers";

const mockActiveElement = (tagName: string, isContentEditable = false) => {
  Object.defineProperty(document, "activeElement", {
    value: {
      tagName,
      isContentEditable,
    },
    writable: true,
  });
};

describe("useKeyboardNavigation", () => {
  const mockCallbacks = {
    onLeft: jest.fn(),
    onRight: jest.fn(),
    onArrowUp: jest.fn(),
    onArrowDown: jest.fn(),
    onSpace: jest.fn(),
    onEnter: jest.fn(),
    onKeyM: jest.fn(),

    onComma: jest.fn(),
    onPeriod: jest.fn(),

    onDigit1: jest.fn(),
    onDigit2: jest.fn(),
    onDigit3: jest.fn(),
    onDigit4: jest.fn(),
    onDigit5: jest.fn(),
    onDigit6: jest.fn(),
    onDigit7: jest.fn(),
    onDigit8: jest.fn(),
    onDigit9: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockActiveElement("BODY", false);
  });

  afterEach(() => {
    Object.defineProperty(document, "activeElement", {
      value: document.createElement("div"),
      writable: true,
    });
  });

  it("shouldn't call anything when an input is focused", () => {
    mockActiveElement("INPUT", false);
    renderHook(() => useKeyboardNavigation(mockCallbacks));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(mockCallbacks.onEnter).not.toHaveBeenCalled();
  });

  it("should call appropriate callbacks for arrow keys", () => {
    renderHook(() => useKeyboardNavigation(mockCallbacks));

    const testCases = [
      { key: "ArrowUp", callback: "onArrowUp" },
      { key: "ArrowDown", callback: "onArrowDown" },
      { key: "ArrowLeft", callback: "onLeft" },
      { key: "ArrowRight", callback: "onRight" },
    ];

    testCases.forEach(({ key, callback }) => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      expect(
        mockCallbacks[callback as keyof typeof mockCallbacks],
      ).toHaveBeenCalledTimes(1);
    });
  });

  it("should call appropriate callbacks for Space and Enter", () => {
    renderHook(() => useKeyboardNavigation(mockCallbacks));

    const testCases = [
      { key: " ", callback: "onSpace" },
      { key: "Enter", callback: "onEnter" },
    ];

    testCases.forEach(({ key, callback }) => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      expect(
        mockCallbacks[callback as keyof typeof mockCallbacks],
      ).toHaveBeenCalledTimes(1);
    });
  });

  it("should call appropriate callbacks for m", () => {
    renderHook(() => useKeyboardNavigation(mockCallbacks));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "m" }));
    expect(mockCallbacks.onKeyM).toHaveBeenCalledTimes(1);
  });

  it("should call appropriate callbacks for comma and period", () => {
    renderHook(() => useKeyboardNavigation(mockCallbacks));

    const testCases = [
      { key: ",", callback: "onComma" },
      { key: ".", callback: "onPeriod" },
    ];

    testCases.forEach(({ key, callback }) => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      expect(
        mockCallbacks[callback as keyof typeof mockCallbacks],
      ).toHaveBeenCalledTimes(1);
    });
  });

  it("should call appropriate callbacks for number buttons", () => {
    renderHook(() => useKeyboardNavigation(mockCallbacks));

    const testCases = [
      { key: "1", callback: "onDigit1" },
      { key: "2", callback: "onDigit2" },
      { key: "3", callback: "onDigit3" },
      { key: "4", callback: "onDigit4" },
      { key: "5", callback: "onDigit5" },
      { key: "6", callback: "onDigit6" },
      { key: "7", callback: "onDigit7" },
      { key: "8", callback: "onDigit8" },
      { key: "9", callback: "onDigit9" },
    ];

    testCases.forEach(({ key, callback }) => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
      expect(
        mockCallbacks[callback as keyof typeof mockCallbacks],
      ).toHaveBeenCalledTimes(1);
    });
  });

  it("should call appropriate callbacks when activeElement is null", () => {
    Object.defineProperty(document, "activeElement", {
      value: null,
      writable: true,
    });

    renderHook(() => useKeyboardNavigation(mockCallbacks));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(mockCallbacks.onEnter).toHaveBeenCalledTimes(1);
  });

  describe("edge cases", () => {
    it("should not call shortcut func when there is an editable elem focused", () => {
      mockActiveElement("DIV", true);
      renderHook(() => useKeyboardNavigation(mockCallbacks));
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" }),
      );
      expect(mockCallbacks.onLeft).not.toHaveBeenCalled();
    });
    it("should handle INPUT element", () => {
      mockActiveElement("INPUT", true);
      renderHook(() => useKeyboardNavigation(mockCallbacks));
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" }),
      );
      expect(mockCallbacks.onLeft).not.toHaveBeenCalled();
    });
    it("should handle TEXTAREA element", () => {
      mockActiveElement("TEXTAREA", true);
      renderHook(() => useKeyboardNavigation(mockCallbacks));
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" }),
      );
      expect(mockCallbacks.onLeft).not.toHaveBeenCalled();
    });
    it("should handle undefined callbacks in config", () => {
      const emptyConfig = {};
      renderHook(() => useKeyboardNavigation(emptyConfig));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" }),
      );
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" }),
      );
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown" }),
      );
      document.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "m" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "." }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "," }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "1" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "2" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "3" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "4" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "5" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "6" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "7" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "8" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "9" }));
    });
  });
});
