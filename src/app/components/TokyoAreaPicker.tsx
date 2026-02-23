import { TOKYO_AREAS } from "../constants/tokyoAreas";

type Props = {
  onSelect: (p: { lat: number; lon: number; name: string }) => void;
};

export function TokyoAreaPicker({ onSelect }: Props) {
  return (
    <section>
      <h2>東京エリア</h2>
      <ul>
        {TOKYO_AREAS.map((a) => (
          <li key={a.id} style={{paddingBottom: 2}}>
            <button
              style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                     
                    }}
              onClick={() => onSelect({ lat: a.lat, lon: a.lon, name: a.name })}
            >
              {a.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
