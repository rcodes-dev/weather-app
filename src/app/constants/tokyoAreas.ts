export type TokyoArea = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

export const TOKYO_AREAS: TokyoArea[] = [
  { id: "shibuya", name: "渋谷", lat: 35.658, lon: 139.7016 },
  { id: "shinjuku", name: "新宿", lat: 35.6938, lon: 139.7034 },
  { id: "ikebukuro", name: "池袋", lat: 35.7295, lon: 139.7109 },
  { id: "tokyo", name: "東京駅", lat: 35.6812, lon: 139.7671 },
  { id: "ueno", name: "上野", lat: 35.7138, lon: 139.7773 },
];
