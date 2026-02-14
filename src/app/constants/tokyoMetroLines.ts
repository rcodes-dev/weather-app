export type TokyoMetroLine = {
  id: string;
  name: string;
  railwayCode: string;
};

export const TOKYO_METRO_LINES: TokyoMetroLine[] = [
  { id: "ginza", name: "銀座線", railwayCode: "odpt.Railway:TokyoMetro.Ginza" },
  {
    id: "marunouchi",
    name: "丸ノ内線",
    railwayCode: "odpt.Railway:TokyoMetro.Marunouchi",
  },
  {
    id: "hibiya",
    name: "日比谷線",
    railwayCode: "odpt.Railway:TokyoMetro.Hibiya",
  },
  { id: "tozai", name: "東西線", railwayCode: "odpt.Railway:TokyoMetro.Tozai" },
  {
    id: "chiyoda",
    name: "千代田線",
    railwayCode: "odpt.Railway:TokyoMetro.Chiyoda",
  },
  {
    id: "yurakucho",
    name: "有楽町線",
    railwayCode: "odpt.Railway:TokyoMetro.Yurakucho",
  },
  {
    id: "hanzomon",
    name: "半蔵門線",
    railwayCode: "odpt.Railway:TokyoMetro.Hanzomon",
  },
  {
    id: "namboku",
    name: "南北線",
    railwayCode: "odpt.Railway:TokyoMetro.Namboku",
  },
  {
    id: "fukutoshin",
    name: "副都心線",
    railwayCode: "odpt.Railway:TokyoMetro.Fukutoshin",
  },
];
