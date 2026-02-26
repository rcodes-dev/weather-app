# 🌤️ Weather App

Next.js App Router と TypeScript を使用して開発した天気アプリ
検索と検索結果の天候に応じてアイコンと背景色が変わる

**Live Demo:**
https://weather-app-rcodes.vercel.app/

**Repository:**
https://github.com/rcodes-dev/weather-app

---

## ✨ Features

- 東京主要エリアのクイック選択
- 全国の地点検索（Open-Meteo Geocoding API）
- 現在の天気・気温・風速・降水量の表示
- 天気コードに応じたアイコン表示
- 背景色を天気ごとに設定
- Loading / Error 状態管理
- カスタムフックによるロジック分離

---

## ⚙️ Tech Stack

**Frontend**

- Next.js (App Router)
- React
- TypeScript

**UI**

- Lucide React
- CSS Modules

**API**

- Open-Meteo API
- Next.js Route Handlers

**Infrastructure**

- Vercel

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

open:

```
http://localhost:3000
```

---

## 🧪 Future Improvements

- Vitestによるユニットテスト追加
- PWA対応
- お気に入り地点保存
- CI/CD (GitHub Actions)
