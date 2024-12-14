import React from "react";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";

const Balance = async () => {
  try {
    // セッション情報を取得
    const session = await auth();

    // セッションが取得できない場合はエラーを表示
    if (!session || !session.user || !session.user.id) {
      console.error("セッション情報が取得できませんでした。");
      return <div>セッション情報が必要です。</div>;
    }

    const userId = session.user.id;

    // ユーザーの Balance レコードを取得
    let existingBalance = await prisma.balance.findUnique({
      where: { userId },
    });
    // 存在しない場合は新しいレコードを作成
    if (!existingBalance) {
      existingBalance = await prisma.balance.create({
        data: {
          userId,
          balance: 0,
        },
      });
    }
    // 取得した残高を表示
    return <div>{existingBalance.balance}</div>;
  } catch (error) {
    console.error(
      "Balanceテーブルの取得または作成中にエラーが発生しました:",
      error
    );
    return <div>エラーが発生しました。</div>;
  }
};

export default Balance;
