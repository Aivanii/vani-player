import { runInAction } from "mobx";
import { SettingsStore } from "../../app/stores/settingsStore/settingsStore";

const mockRootElement = {
  style: { setProperty: jest.fn() },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setAttribute: jest.fn(),
};

describe("settingsStore", () => {
  const mockMatchMedia = jest.fn();
  beforeAll(() => {
    Object.defineProperty(document, "documentElement", {
      value: mockRootElement,
      writable: true,
    });
    Object.defineProperty(window, "matchMedia", {
      value: mockMatchMedia,
      writable: true,
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
    mockMatchMedia.mockClear();
    mockMatchMedia.mockImplementation((q: string) => ({
      matches: q === "(prefers-color-scheme: dark)" ? true : false,
      media: q,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  describe("setTheme", () => {
    it("should set light theme and update DOM", () => {
      SettingsStore.setTheme("light");
      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "light",
      );
    });
    it("should set dark theme and update DOM", () => {
      SettingsStore.setTheme("dark");
      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "dark",
      );
    });
    it("should set mint theme and update DOM", () => {
      SettingsStore.setTheme("mint");
      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "mint",
      );
    });
    it("should set lavender theme and update DOM", () => {
      SettingsStore.setTheme("lavender");
      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "lavender",
      );
    });
    it("auto theme detection", () => {
      SettingsStore.setTheme("auto");
      expect(mockRootElement.setAttribute).not.toHaveBeenCalledWith(
        "data-theme",
        "auto",
      );

      expect(SettingsStore.theme).toBe("auto");
    });
  });

  describe("auto theme detection", () => {
    it("should use dark theme when prefers-color-scheme: dark matches", () => {
      runInAction(() => {
        SettingsStore.setTheme("auto");
      });

      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)",
      );

      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "dark",
      );
    });

    it("should use light theme when prefers-color-scheme: light matches", () => {
      mockMatchMedia.mockImplementation((q: string) => ({
        matches: q === "(prefers-color-scheme: light)",
        media: q,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));
      runInAction(() => {
        SettingsStore.setTheme("auto");
      });

      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)",
      );

      expect(mockRootElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "light",
      );
    });
  });

  describe("theme swtiching", () => {
    it("should correctly switch between themes", () => {});
  });

  describe("setVisualizerStyle", () => {
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

  describe("setRecsStyle", () => {
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

  describe("setActiveBlur", () => {
    it("active blur value is applied properly ", () => {
      SettingsStore.activeBlur = "2";
      SettingsStore.setActiveBlur("12");

      expect(SettingsStore.activeBlur).toBe("12");
      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-blur",
        "12px",
      );
    });
  });

  describe("setActiveRounding", () => {
    it("active rounding value is applied properly ", () => {
      SettingsStore.activeRounding = "2";
      SettingsStore.setActiveRounding("12");

      expect(SettingsStore.activeRounding).toBe("12");
      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-rounding",
        "12px",
      );
    });
  });

  describe("setActiveBorderSize", () => {
    it("active border size value is applied properly ", () => {
      SettingsStore.activeBorderSize = "2";
      SettingsStore.setActiveBorderSize("12");

      expect(SettingsStore.activeBorderSize).toBe("12");
      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-border-size",
        "12px",
      );
    });
  });

  describe("setActiveAnimSpeedMs", () => {
    it("active active anim speed value is applied properly ", () => {
      SettingsStore.activeAnimSpeedMs = "250";
      SettingsStore.setActiveAnimSpeedMs("100");

      expect(SettingsStore.activeAnimSpeedMs).toBe("100");
      expect(mockRootElement.style.setProperty).toHaveBeenCalledWith(
        "--data-active-anim-speed",
        "100ms",
      );
    });
  });

});
