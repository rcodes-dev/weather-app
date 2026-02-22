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
    0: Sun, //快晴
    1: Sun, //晴れ
    2: CloudSun, //一部曇り
    3: Cloud, //曇り
    45: CloudFog, //霧
    48: CloudFog, //霧氷
    51: CloudDrizzle, //弱い霧雨
    53: CloudDrizzle, //霧雨
    55: CloudDrizzle, //強い霧雨
    61: CloudRain, //弱い雨
    63: CloudRain, //雨
    65: CloudRain, //強い雨
    71: CloudSnow, //弱い雪
    73: CloudSnow, //雪
    75: CloudSnow, //大雪
    80: CloudRain, //にわか雨
    95: CloudLightning, //雷雨
  };

  return map[code] ?? HelpCircle;
}
