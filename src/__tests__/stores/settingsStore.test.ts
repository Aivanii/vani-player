import { SettingsStore } from "../../app/stores/settingsStore/settingsStore";
import { settingsSections } from "../../features/settings/settingsSections";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({})),
});

const mockRootElement = {
  style: { setProperty: jest.fn() },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setAttribute: jest.fn(),
};

describe("settingsStore", () => {
  beforeAll(() => {
    Object.defineProperty(document, "documentElement", {
      value: mockRootElement,
      writable: true,
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("setTheme", () => {
    it("should set light theme and update DOM", () => {
      expect(1).toBe(2);
    });
    it("should set dark theme and update DOM", () => {
      expect(1).toBe(2);
    });
    it("should set mint theme and update DOM", () => {
      expect(1).toBe(2);
    });
    it("should set lavender theme and update DOM", () => {
      expect(1).toBe(2);
    });
    it("auto theme detection", () => {
      expect(1).toBe(2);
    });
  });

  describe("auto theme detection", () => {
    it("should use dark theme when prefers-color-scheme: dark matches", () => {
      expect(1).toBe(2);
    });

    it("should use light theme when prefers-color-scheme: light matches", () => {
      expect(1).toBe(2);
    });
  });

  describe("theme swtiching", () => {
    it("should correctly switch between themes", () => {});
  });

  describe("visualizerStyle", () => {
    it("fancy visualizer property is applied properly", () => {
      SettingsStore.setVisualizerStyle("fancy");

      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-visualizer-style",
        SettingsStore.visualizerStyle,
      );
      expect(SettingsStore.visualizerStyle).toBe("fancy");
    });
    it("standard visualizer property is applied properly", () => {
      SettingsStore.setVisualizerStyle("fancy");
      SettingsStore.setVisualizerStyle("standard");

      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-visualizer-style",
        SettingsStore.visualizerStyle,
      );
      expect(SettingsStore.visualizerStyle).toBe("standard");
    });
  });

  describe("recsStyle", () => {
    it("vertical recsStyle property is applied properly", () => {
      SettingsStore.setRecsStyle("vertical");

      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-recs-style",
        SettingsStore.recsStyle,
      );
      expect(SettingsStore.recsStyle).toBe("vertical");
    });
    it("horizontal recsStyle property is applied properly", () => {
      SettingsStore.setRecsStyle("horizontal");

      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-recs-style",
        SettingsStore.recsStyle,
      );
      expect(SettingsStore.recsStyle).toBe("horizontal");
    });
  });
});
