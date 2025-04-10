import type { NextApiRequest, NextApiResponse } from "next";

type ShuffleRequestData = {
  members: string[];
};

type ShuffleResponseData = {
  members: string[];
};

/**
 * 配列をシャッフルする関数
 * @param array シャッフルする配列
 * @returns シャッフルされた新しい配列
 */
const shuffleArray = <T>(array: T[]): T[] => {
  // 配列のコピーを作成
  const newArray = [...array];

  // Fisher-Yatesアルゴリズムでシャッフル
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

/**
 * シャッフル API
 * @param req リクエスト
 * @param res レスポンス
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShuffleResponseData | { error: string }>,
) {
  // POST リクエスト以外は許可しない
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // リクエストボディをパース
    const { members } = req.body as ShuffleRequestData;

    // メンバーの配列がない場合はエラー
    if (!members || !Array.isArray(members)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // 空の文字列を削除
    const validMembers = members.filter((member) => member.trim() !== "");

    // シャッフル
    const shuffledMembers = shuffleArray(validMembers);

    // 結果を返す
    return res.status(200).json({ members: shuffledMembers });
  } catch (error) {
    console.error("Error shuffling members:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
