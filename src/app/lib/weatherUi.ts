import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  HelpCircle,
  Moon,
  CloudMoon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function weatherCodeToIcon(
  code: number,
  isDay: boolean | null,
): LucideIcon {
  const night = isDay === false;
  if (night && (code === 0 || code === 1)) return Moon;
  if (night && code === 2) return CloudMoon;

  const map: Record<number, LucideIcon> = {
    0: Sun,
    1: Sun,
    2: CloudSun,
    3: Cloud,
    45: CloudFog,
    48: CloudFog,
    51: CloudDrizzle,
    53: CloudDrizzle,
    55: CloudDrizzle,
    61: CloudRain,
    63: CloudRain,
    65: CloudRain,
    80: CloudRain,
    71: CloudSnow,
    73: CloudSnow,
    75: CloudSnow,
    95: CloudLightning,
  };
  return map[code] ?? HelpCircle;
}

// 今使用してない？？
export function weatherCodeToText(code: number): string {
  const map: Record<number, string> = {
    0: "快晴",
    1: "晴れ",
    2: "一部曇り",
    3: "曇り",
    45: "霧",
    48: "霧氷",
    51: "弱い霧雨",
    53: "霧雨",
    55: "強い霧雨",
    61: "弱い雨",
    63: "雨",
    65: "強い雨",
    71: "弱い雪",
    73: "雪",
    75: "大雪",
    80: "にわか雨",
    95: "雷雨",
  };
  return map[code] ?? "不明";
}

export function weatherCodeToBg(
  code: number | null,
  isDay: boolean | null,
): string {
  const night = isDay === false;
  if (code === null) return night ? "bg-default-night" : "bg-default";
  if ([0, 1].includes(code)) return night ? "bg-sunny-night" : "bg-sunny";
  if (code === 2) return night ? "bg-partly-night" : "bg-partly";
  if ([3, 45, 48].includes(code))
    return night ? "bg-cloudy-night" : "bg-cloudy";
  if ([51, 53, 55, 61, 63, 65, 80].includes(code))
    return night ? "bg-rainy-night" : "bg-rainy";
  if ([71, 73, 75].includes(code)) return night ? "bg-snow-night" : "bg-snow";
  if (code === 95) return night ? "bg-storm-night" : "bg-storm";
  return night ? "bg-default-night" : "bg-default";
}
