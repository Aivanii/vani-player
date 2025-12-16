import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("\\.css$", () => ({}), { virtual: true });

window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.addEventListener = jest.fn();
window.HTMLMapElement.prototype.removeAttributeNode = jest.fn();

global.Audio = jest.fn().mockImplementation(() => ({
  load: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(() => Promise.resolve()),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentTime: 0,
  volume: 1,
  muted: false,
  duration: 200,
  src: "",
  paused: true,
}));
