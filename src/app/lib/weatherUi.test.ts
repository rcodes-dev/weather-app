import { describe, it, expect } from "vitest";
import {
  weatherCodeToBg,
  weatherCodeToIcon,
  weatherCodeToText,
} from "./weatherUi";
import { Moon, CloudMoon, Sun, CloudSun, HelpCircle } from "lucide-react";

describe("weatherCodeToText", () => {
  it("0なら快晴を返す", () => {
    expect(weatherCodeToText(0)).toBe("快晴");
  });

  it("2なら一部曇りを返す", () => {
    expect(weatherCodeToText(2)).toBe("一部曇り");
  });

  it("65なら強い雨を返す", () => {
    expect(weatherCodeToText(65)).toBe("強い雨");
  });

  it("未知コードなら不明を返す", () => {
    expect(weatherCodeToText(999)).toBe("不明");
  });
});

describe("weatherCodeToIcon", () => {
  it("夜の特殊分岐：0/1はMoon、2はCloudMoon", () => {
    expect(weatherCodeToIcon(0, false)).toBe(Moon);
    expect(weatherCodeToIcon(1, false)).toBe(Moon);
    expect(weatherCodeToIcon(2, false)).toBe(CloudMoon);
  });

  it("昼：mapに従って返す。未知はHelpCircle", () => {
    expect(weatherCodeToIcon(0, true)).toBe(Sun);
    expect(weatherCodeToIcon(2, true)).toBe(CloudSun);
    expect(weatherCodeToIcon(999, true)).toBe(HelpCircle);
  });
});

describe("weatherCodeToBg", () => {
  it("nullはdefault（昼/夜）", () => {
    expect(weatherCodeToBg(null, true)).toBe("bg-default");
    expect(weatherCodeToBg(null, false)).toBe("bg-default-night");
  });

  it("雪・雷・未知（昼/夜）", () => {
    expect(weatherCodeToBg(71, true)).toBe("bg-snow");
    expect(weatherCodeToBg(95, false)).toBe("bg-storm-night");
    expect(weatherCodeToBg(999, true)).toBe("bg-default");
  });

  it("雨系は rainy / rainy-night を返す", () => {
    expect(weatherCodeToBg(65, true)).toBe("bg-rainy"); // 昼
    expect(weatherCodeToBg(65, false)).toBe("bg-rainy-night"); // 夜
  });

  it("sunny / partly / cloudy を昼夜で踏む", () => {
    expect(weatherCodeToBg(0, true)).toBe("bg-sunny");
    expect(weatherCodeToBg(0, false)).toBe("bg-sunny-night");

    expect(weatherCodeToBg(2, true)).toBe("bg-partly");
    expect(weatherCodeToBg(2, false)).toBe("bg-partly-night");

    expect(weatherCodeToBg(45, true)).toBe("bg-cloudy");
    expect(weatherCodeToBg(45, false)).toBe("bg-cloudy-night");
  });

  it("snow / storm / default を昼夜で踏む", () => {
    expect(weatherCodeToBg(71, true)).toBe("bg-snow");
    expect(weatherCodeToBg(71, false)).toBe("bg-snow-night");

    expect(weatherCodeToBg(95, true)).toBe("bg-storm");
    expect(weatherCodeToBg(95, false)).toBe("bg-storm-night");

    expect(weatherCodeToBg(999, true)).toBe("bg-default");
    expect(weatherCodeToBg(999, false)).toBe("bg-default-night");
  });
});
