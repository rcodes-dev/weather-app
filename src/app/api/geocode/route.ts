import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ results: [] });

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "10");
  url.searchParams.set("language", "ja");
  url.searchParams.set("format", "json");

  const res = await fetch(url, { next: { revalidate: 60 * 60 } }); // 1h
  if (!res.ok) return NextResponse.json({ results: [] });

  const data = await res.json();
  return NextResponse.json({ results: data.results ?? [] });
}
