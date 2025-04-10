import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";

// API レスポンスの型定義
type ShuffleResponse = {
  members: string[];
  error?: string;
};

export const ShuffleMemberForm = () => {
  // 入力値と結果の状態管理
  const [members, setMembers] = useState<{ [key: string]: string }>({
    first: "",
    second: "",
    third: "",
  });
  const [result, setResult] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 入力値の変更ハンドラ
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMembers((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // シャッフルボタンのクリックイベント
  const handleShuffleClick = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      // フィルタリングして空でない値のみ取得
      const memberValues = Object.values(members).filter(
        (member) => member.trim() !== "",
      );

      if (memberValues.length < 2) {
        setError("2人以上のメンバーを入力してください");
        return;
      }

      const res = await fetch("/api/shuffle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ members: memberValues }),
      });

      const data = (await res.json()) as ShuffleResponse;

      if (res.ok) {
        setResult(data.members);
      } else {
        setError(data.error || "シャッフルに失敗しました");
      }
    } catch (error) {
      setError("エラーが発生しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [members]);
  return (
    <>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first">1人目</Label>
            <Input
              id="first"
              name="first"
              value={members.first}
              onChange={handleInputChange}
              placeholder="1人目の名前を入力"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="second">2人目</Label>
            <Input
              id="second"
              name="second"
              value={members.second}
              onChange={handleInputChange}
              placeholder="2人目の名前を入力"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="third">3人目</Label>
            <Input
              id="third"
              name="third"
              value={members.third}
              onChange={handleInputChange}
              placeholder="3人目の名前を入力"
            />
          </div>
          <Button
            onClick={() => void handleShuffleClick()}
            disabled={isLoading}
          >
            シャッフル
          </Button>
          <div className="flex flex-col gap-2">
            <Label htmlFor="result">結果</Label>
            <div
              id="result"
              role="status"
              className={error ? "text-red-500" : ""}
            >
              {error ? error : result.length > 0 ? result.join("→") : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
