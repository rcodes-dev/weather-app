"use client";

import { TOKYO_AREAS } from "./constants/tokyoAreas";
import { fetchCurrentWeather } from "./lib/weatherApi";
import styles from "./page.module.css";
import { useState } from "react";
import { weatherCodeToIcon } from "./lib/weatherCodeMap";
import { PacmanLoader } from "react-spinners";

type GeoResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

type WeatherCurrent = {
  temperature_2m?: number;
  wind_speed_10m?: number;
  precipitation?: number;
  weather_code?: number;
  is_day?: number;
};

type WeatherResponse = {
  current?: WeatherCurrent;
};

function weatherCodeToBg(code: number | null, isDay: boolean | null): string {
  const night = isDay === false;
  if (code === null) return night ? "bg-default-night" : "bg-default";

  if ([0, 1].includes(code)) return night ? "bg-sunny-night" : "bg-sunny";
  if ([2].includes(code)) return night ? "bg-partly-night" : "bg-partly";
  if ([3, 45, 48].includes(code))
    return night ? "bg-cloudy-night" : "bg-cloudy";
  if ([51, 53, 55, 61, 63, 65, 80].includes(code))
    return night ? "bg-rainy-night" : "bg-rainy";
  if ([71, 73, 75].includes(code)) return night ? "bg-snow-night" : "bg-snow";
  if ([95].includes(code)) return night ? "bg-storm-night" : "bg-storm";

  return night ? "bg-default-night" : "bg-default";
}

export default function Home() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  const [weatherTitle, setWeatherTitle] = useState<string | null>(null);
  const [weatherText, setWeatherText] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<GeoResult | null>(null);
  const [isDay, setIsDay] = useState<boolean | null>(null);

  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const WeatherIcon =
    typeof weatherCode === "number"
      ? weatherCodeToIcon(weatherCode, isDay)
      : null;

  async function loadWeather(areaLike: {
    lat: number;
    lon: number;
    name: string;
  }) {
    setError(null);
    setWeatherText(null);
    setWeatherTitle(areaLike.name);
    setIsLoading(true);
    setWeatherCode(null);
    setIsDay(null);

    try {
      const data = (await fetchCurrentWeather(
        areaLike as any,
      )) as WeatherResponse;
      const c = data.current;

      if (!c) {
        throw new Error("current is missing");
      }

      const code = c.weather_code;

      setIsDay(c.is_day === 1 ? true : c.is_day === 0 ? false : null);

      setWeatherCode(typeof code === "number" ? code : null);

      setWeatherText(
        `気温: ${c.temperature_2m}°C / 風: ${c.wind_speed_10m} / 
        降水: ${c.precipitation}`,
      );
    } catch {
      setError("天気の取得に失敗しました");
      setWeatherTitle(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchPlaces() {
    const q = query.trim();
    if (!q) {
      setGeoResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setGeoResults(data.results ?? []);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className={`${styles.page} ${weatherCodeToBg(weatherCode, isDay)}`}>
      <main>
        <h1>Weather App</h1>
        <p>東京エリアの天気 + 全国検索もできます。</p>

        <section>
          <h2>東京エリア</h2>
          <ul>
            {TOKYO_AREAS.map((a) => {
              const isSelected = a.id === selectedAreaId;
              return (
                <li key={a.id} style={{ marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={async () => {
                      setSelectedAreaId(a.id);
                      setSelected(null);
                      await loadWeather({
                        lat: a.lat,
                        lon: a.lon,
                        name: a.name,
                      });
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      fontWeight: isSelected ? 700 : 400,
                    }}
                  >
                    {a.name} {isSelected ? "（選択中）" : ""}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-4 space-y-3">
          <h2>全国検索</h2>

          <div className="flex gap-2">
            <input
              className="flex-1 rounded-md border px-3 py-2 text-sm"
              placeholder="地名を入力（例：札幌、福岡、那覇）"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchPlaces();
              }}
            />
            <button
              className="rounded-md border px-3 py-2 text-sm"
              onClick={searchPlaces}
              disabled={isSearching}
              type="button"
            >
              {isSearching ? "検索中…" : "検索"}
            </button>
          </div>

          {geoResults.length > 0 && (
            <div className="rounded-md border">
              {geoResults.map((r, idx) => (
                <button
                  key={`${r.id ?? idx}-${r.latitude}-${r.longitude}`}
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                  type="button"
                  onClick={async () => {
                    setSelected(r);
                    setSelectedAreaId(null);
                    await loadWeather({
                      lat: r.latitude,
                      lon: r.longitude,
                      name: `${r.name}${r.admin1 ? `（${r.admin1}）` : ""}`,
                    });
                  }}
                >
                  <div className="font-medium">
                    {r.name}
                    {r.admin1 ? `（${r.admin1}）` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {r.country ?? ""} / {r.latitude.toFixed(4)},{" "}
                    {r.longitude.toFixed(4)}
                  </div>
                </button>
              ))}
            </div>
          )}

          {selected && (
            <div className="text-sm">
              全国検索の選択中：
              <span className="font-medium">{selected.name}</span>
              {selected.admin1 ? `（${selected.admin1}）` : ""}
            </div>
          )}
        </section>

        <section style={{ marginTop: 16 }}>
          {isLoading && (
            <div className="mt-4">
              <PacmanLoader color="#ffffff" />
            </div>
          )}

          {error && <p style={{ marginTop: 16 }}>{error}</p>}

          <p>
            isDay: {String(isDay)} / code: {weatherCode ?? "null"}
          </p>

          {!isLoading && !error && weatherTitle && (
            <div style={{ marginTop: 16 }}>
              {weatherTitle && (
                <div style={{ fontWeight: 700 }}>{weatherTitle} の天気</div>
              )}

              {WeatherIcon && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <WeatherIcon size={44} />
                </div>
              )}


              {weatherText && <p style={{ marginTop: 8 }}>{weatherText}</p>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
