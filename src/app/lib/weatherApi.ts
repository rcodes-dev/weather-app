import { TokyoArea } from "../constants/tokyoAreas";

export async function fetchCurrentWeather(area: TokyoArea) {
  const res = await fetch(
    `/api/weather?lat=${encodeURIComponent(area.lat)}&lon=${encodeURIComponent(area.lon)}`,
  );
  if (!res.ok) throw new Error("天気の取得に失敗しました");
  return res.json();
}
