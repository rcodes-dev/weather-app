"use client";
import { PacmanLoader } from "react-spinners";
import { weatherCodeToIcon, weatherCodeToText } from "../lib/weatherUi";
import { HelpCircle } from "lucide-react";

export function WeatherResultCard(props: {
  title: string | null;
  code: number | null;
  isDay: boolean | null;
  temp: number | null;
  wind: number | null;
  precip: number | null;
  isLoading: boolean;
  error: string | null;
}) {
  const { title, code, isDay, temp, wind, precip, isLoading, error } = props;

  if (isLoading)
    return (
      <div className="mt-4">
        <PacmanLoader color="#ffffff" />
      </div>
    );
  if (error) return <p className="mt-4">{error}</p>;
  if (!title) return null;

  const Icon = typeof code === "number" ? weatherCodeToIcon(code, isDay) : null;

  return (
    <div
      className="mt-4"
      style={{
        padding: 16,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(6px)",
        maxWidth: 520,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title} の天気</div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {Icon ? <Icon size={56} /> : <HelpCircle size={56} />}

        <div style={{ lineHeight: 1.6 }}>
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            {typeof temp === "number" ? Math.round(temp) : "--"}°
          </div>
          <div style={{ opacity: 0.9 }}>
            {typeof code === "number" ? weatherCodeToText(code) : "不明"}
            {isDay === null ? "" : isDay ? "（昼）" : "（夜）"}
          </div>
          <div style={{ opacity: 0.85, fontSize: 14, marginTop: 6 }}>
            風: {typeof wind === "number" ? wind : "--"} / 降水:{" "}
            {typeof precip === "number" ? precip : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
