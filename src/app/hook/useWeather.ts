"use client";
import { useCallback, useState } from "react";
import { fetchCurrentWeather } from "../lib/weatherApi";

type WeatherCurrent = {
  temperature_2m?: number;
  wind_speed_10m?: number;
  precipitation?: number;
  weather_code?: number;
  is_day?: number;
};
type WeatherResponse = { current?: WeatherCurrent };

export function useWeather() {
  const [title, setTitle] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);
  const [isDay, setIsDay] = useState<boolean | null>(null);

  const [temp, setTemp] = useState<number | null>(null);
  const [wind, setWind] = useState<number | null>(null);
  const [precip, setPrecip] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (p: { lat: number; lon: number; name: string }) => {
      setIsLoading(true);
      setError(null);
      setTitle(p.name);

      try {
        const data = (await fetchCurrentWeather(p as any)) as WeatherResponse;
        const c = data?.current;
        if (!c) throw new Error("current missing");

        setCode(typeof c.weather_code === "number" ? c.weather_code : null);
        setIsDay(c.is_day === 1 ? true : c.is_day === 0 ? false : null);

        setTemp(typeof c.temperature_2m === "number" ? c.temperature_2m : null);
        setWind(typeof c.wind_speed_10m === "number" ? c.wind_speed_10m : null);
        setPrecip(typeof c.precipitation === "number" ? c.precipitation : null);
      } catch {
        setError("天気の取得に失敗しました");
        setCode(null);
        setIsDay(null);
        setTemp(null);
        setWind(null);
        setPrecip(null);
        setTitle(null);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { title, code, isDay, temp, wind, precip, isLoading, error, load };
}
