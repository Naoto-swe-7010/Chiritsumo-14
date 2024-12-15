import React from "react";
import { prisma } from "../../../../prisma";
import { getSessionAndUserId } from "@/app/lib/commonFunction";
import Value from "./BalanceValue";

const Balance = async () => {
  try {
    // UserIDを取得
    const userId = await getSessionAndUserId();

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
    console.error("Balanceテーブルの取得または作成中にエラーが発生しました:");
  }
};
export default Balance;
