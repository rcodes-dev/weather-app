import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
      <h1>Train Delay App</h1>
      <section>
        <h2>予定</h2>
        <p>東京メトロの運行・遅延情報を確認するアプリです。</p>
        <ul>
          <li>路線選択</li>
          <li>運行情報の取得</li>
          <li>ローディング / エラー表示</li>
        </ul>
      </section>
    </main>
    </div>
  );
}
