import { TokyoMetroLine } from "../constants/tokyoMetroLines";

// TODO: 仮
export type TrainInformation = {
  railwayCode: string;
  statusText: string; 
  fetchedAt: string;
};

export async function fetchTrainInformation(
  line: TokyoMetroLine,
): Promise<TrainInformation> {
  // TODO: 次のステップで呼ぶ
  return {
    railwayCode: line.railwayCode,
    statusText: "（仮）運行情報を取得予定",
    fetchedAt: new Date().toISOString(),
  };
}
