import React from "react";
import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../prisma";

const page = async () => {
  const session = await auth();
  !session && redirect("/");

  try {
    // ユーザーの Balance レコードを確認
    const userId = session!.user!.id;

    if (!userId) {
      throw new Error("セッションからユーザー ID が取得できませんでした。");
    }

    const existingBalance = await prisma.balance.findUnique({
      where: { userId },
    });

    // 存在しない場合は新しいレコードを作成
    if (!existingBalance) {
      await prisma.balance.create({
        data: {
          userId,
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
      {session?.user?.name}さん、こんにちは。
      {session?.user?.image && <img src={session.user.image} />}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>サインアウト</button>
      </form>
    </div>
  );
};

export default page;
