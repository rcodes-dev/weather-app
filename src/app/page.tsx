"use client";

import { TOKYO_AREAS } from "./constants/tokyoAreas";
import { fetchCurrentWeather } from "./lib/weatherApi";
import styles from "./page.module.css";
import { useState } from "react";
import { weatherCodeToText } from "./lib/weatherCodeMap";
import { PacmanLoader } from "react-spinners";

type GeoResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

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

  async function loadWeather(areaLike: {
    lat: number;
    lon: number;
    name: string;
  }) {
    setError(null);
    setWeatherText(null);
    setWeatherTitle(areaLike.name);
    setIsLoading(true);

    try {      
      const data = await fetchCurrentWeather(areaLike as any);
      const c = data.current;

      setWeatherText(
        `気温: ${c.temperature_2m}°C / 風: ${c.wind_speed_10m} / 
        降水: ${c.precipitation} / 天気:  ${weatherCodeToText(c.weather_code)}`,
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
    <div className={styles.page}>
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

          {weatherTitle && weatherText && !isLoading && !error && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700 }}>{weatherTitle} の天気</div>
              <p style={{ marginTop: 8 }}>{weatherText}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
