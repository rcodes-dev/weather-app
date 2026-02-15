"use client";
import styles from "./page.module.css";
import { TOKYO_METRO_LINES } from "./constants/tokyoMetroLines";
import { useState } from "react";

export default function Home() {
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const selectedLine = TOKYO_METRO_LINES.find((l) => l.id === selectedLineId);

  return (
    <div className={styles.page}>
      <main>
        <h1>Train Delay App</h1>
        <p>東京メトロの運行・遅延情報を確認するアプリです。</p>
        <section>
          <h2>予定</h2>
          <ul>
            <li>路線選択</li>
            <ul>
              {TOKYO_METRO_LINES.map((line) => {
                const isSelected = line.id === selectedLineId;
                return (
                  <li key={line.id} style={{ marginBottom: 8 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedLineId(line.id)}
                      className={`${styles.lineButton} ${
                        isSelected ? styles.lineButtonSelected : ""
                      }`}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        fontWeight: isSelected ? 700 : 400,
                      }}
                    >
                      {line.name}
                      {isSelected ? "（選択中）" : ""}
                      {isSelected && (
                        <div
                          style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}
                        >
                          railwayCode: {line.railwayCode}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <li>運行情報の取得</li>
            <li>ローディング / エラー表示</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
