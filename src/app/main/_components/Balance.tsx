import React from "react";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";

const Balance = async () => {
  const session = await auth();

  const userId = session!.user!.id;
  if (!userId) {
    console.error("ユーザーIDが取得できませんでした");
    return;
  }

  let existingBalance = null;

  try {
    // ユーザーの Balance レコードを取得
    existingBalance = await prisma.balance.findUnique({
      where: { userId },
    });

    // 存在しない場合は新しいレコードを作成し、それをexistingBalanceに格納
    if (!existingBalance) {
      existingBalance = await prisma.balance.create({
        data: {
          userId: userId!,
          balance: 0,
        },
      });
    }
  } catch (error) {
    console.error(
      "Balanceテーブルの取得または作成中にエラーが発生しました:",
      error
    );
  }
  return <div>{existingBalance!.balance}</div>;
};

export default Balance;
