import { formatTime } from "../../../utils/audio/formatTime";

describe("formatTime", () => {
  it("works with correct params", () => {
    expect(formatTime(200000)).toBe("03:20");
    expect(formatTime(99999999)).toBe("99:59+");
  });
});
