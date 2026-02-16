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
