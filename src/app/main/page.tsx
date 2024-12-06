import React, { Suspense } from "react";
import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../prisma";
import BalanceDisplay from "./_components/BalanceDisplay";
import AddBalance from "./_components/AddBalance";
import BalanceProgress from "./_components/BalanceProgress";

const page = async () => {
  const session = await auth();
  !session && redirect("/");

  const userId = session!.user!.id;

  try {
    // ユーザーの Balance レコードを確認
    const existingBalance = await prisma.balance.findUnique({
      where: { userId },
    });

    // 存在しない場合は新しいレコードを作成
    if (!existingBalance) {
      await prisma.balance.create({
        data: {
          userId: userId!,
          balance: 0,
        },
      });
    }
  } catch (error) {
    console.error(
      "Balanceテーブルの確認または作成中にエラーが発生しました:",
      error
    );
  }

  return (
    <div className="mb-20 mt-[64px] min-h-[calc(100vh-64px)]">
      <BalanceDisplay />
      <AddBalance />
      <BalanceProgress />
    </div>
  );
};

export default page;
