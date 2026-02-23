"use client";

import { TOKYO_AREAS } from "./constants/tokyoAreas";
import styles from "./page.module.css";
import { weatherCodeToBg } from "./lib/weatherUi";
import { useWeather } from "./hook/useWeather";
import { useGeocode } from "./hook/useGeocode";
import { WeatherResultCard } from "./components/WeatherResultCard";
import { PlaceSearch } from "./components/PlaceSearch";
import { TokyoAreaPicker } from "./components/TokyoAreaPicker";

export default function Home() {
  const weather = useWeather();
  const geo = useGeocode();
  return (
    <div
      className={`${styles.page} ${weatherCodeToBg(weather.code, weather.isDay)}`}
    >
      <main>
        <h1>Weather App</h1>
        <p>東京エリアの天気 + 全国検索もできます。</p>

        <TokyoAreaPicker onSelect={weather.load} />

        <PlaceSearch
          query={geo.query}
          setQuery={geo.setQuery}
          results={geo.results}
          isSearching={geo.isSearching}
          onSearch={geo.search}
          onSelect={weather.load}
        />

        <WeatherResultCard {...weather} />
      </main>
    </div>
  );
}
