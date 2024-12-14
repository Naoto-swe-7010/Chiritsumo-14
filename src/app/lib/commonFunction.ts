import { auth } from "../../../auth";

// 日付フォーマット関数
export const formattedDate = (date: Date): string => {
  return date
    .toLocaleString("ja-JP", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/^20/, "");
};

// UserIDの取得
export const getSessionAndUserId = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("セッション情報が取得できませんでした。");
    }
    return session.user.id;
  } catch (error) {
    console.error(error);
    throw new Error("認証が必要です。");
  }
};
