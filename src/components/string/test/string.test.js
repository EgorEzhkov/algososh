import { reverseString } from "./algorithm";

describe("Тестирование алгоритма разворота строки", () => {
  it("Алгоритм корректно разворачивает строку с чётным количеством символов", () => {
    expect(reverseString("asdf")).toEqual(["f", "d", "s", "a"]);
  });
  it("Алгоритм корректно разворачивает строку с нечётным количеством символов", () => {
    expect(reverseString("asd")).toEqual(["d", "s", "a"]);
  });
  it("Алгоритм корректно разворачивает строку с одним символов", () => {
    expect(reverseString("a")).toEqual(["a"]);
  });
  it("Алгоритм корректно разворачивает пустую строку", () => {
    expect(reverseString("")).toEqual([]);
  });
});
