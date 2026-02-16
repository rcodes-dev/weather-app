import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat と lon が必要です" },
      { status: 400 },
    );
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set(
    "current",
    "temperature_2m,precipitation,wind_speed_10m,weather_code",
  );

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Open-Meteo 取得に失敗しました" },
      { status: 502 },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
