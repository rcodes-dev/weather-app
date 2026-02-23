import { GeoResult } from "../hook/useGeocode";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  results: GeoResult[];
  isSearching: boolean;
  onSearch: () => void;
  onSelect: (p: { lat: number; lon: number; name: string }) => void;
};

export function PlaceSearch({
  query,
  setQuery,
  results,
  isSearching,
  onSearch,
  onSelect,
}: Props) {
  return (
    <section>
      <h2>全国検索</h2>

      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button onClick={onSearch} disabled={isSearching}>
          {isSearching ? "検索中…" : "検索"}
        </button>
      </div>

      {results.map((r) => (
        <button
          key={r.latitude}
          onClick={() =>
            onSelect({
              lat: r.latitude,
              lon: r.longitude,
              name: r.name,
            })
          }
        >
          {r.name}
        </button>
      ))}
    </section>
  );
}
