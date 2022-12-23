import { detectSignal, detectMessage } from "./day6";

describe("detectSignal", () => {
  it("should return correct answer", () => {
    const input = "aabbssdsdsuuijgibnpos".split("");
    expect(detectSignal(input)).toEqual(15);
  });
});
describe("detectMessage", () => {
  it("should return correct answer", () => {
    const input = "aabbssdsdsuuiiiiiiiiqwertyuopasdfg".split("");
    expect(detectMessage(input)).toEqual(33);
  });
});
