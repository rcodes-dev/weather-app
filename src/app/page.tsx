"use client";
import { TOKYO_AREAS } from "./constants/tokyoAreas";
import { fetchCurrentWeather } from "./lib/weatherApi";
import styles from "./page.module.css";
import { useState } from "react";
import { weatherCodeToText } from "./lib/weatherCodeMap";

export default function Home() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [weatherText, setWeatherText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <main>
        <h1>Weather App</h1>
        <p>東京エリアの天気アプリです。</p>
        <section>
          <h2>予定</h2>
          <ul>
            <li>エリア選択</li>
            <ul>
              {TOKYO_AREAS.map((a) => {
                const isSelected = a.id === selectedAreaId;
                return (
                  <li key={a.id} style={{ marginBottom: 8 }}>
                    <button
                      type="button"
                      onClick={async () => {
                        setSelectedAreaId(a.id);
                        setError(null);
                        setWeatherText(null);
                        try {
                          const data = await fetchCurrentWeather(a);
                          const c = data.current;
                          setWeatherText(
                            `気温: ${c.temperature_2m}°C / 風: ${c.wind_speed_10m} / 降水: ${c.precipitation} / code: ${weatherCodeToText(c.weather_code)}`,
                          );
                        } catch (e) {
                          setError("天気の取得に失敗しました");
                        }
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
            {weatherText && <p style={{ marginTop: 16 }}>{weatherText}</p>}
            {error && <p style={{ marginTop: 16 }}>{error}</p>}
          </ul>
        </section>
      </main>
    </div>
  );
}
