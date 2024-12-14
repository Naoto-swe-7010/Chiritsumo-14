"use server";

import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AddBalanceSchema,
  AddWantedItemSchema,
  UpdateLogSchema,
  UpdateWantedItemSchema,
} from "./schema";
import {
  AddBalanceFormState,
  AddWantedItemFormState,
  UpdateLogFormState,
  UpdateWantedItemFormState,
} from "./formState";

const session = await auth();
const userId = session!.user!.id!;

// action

// 残高追加（ログ作成）
export const addBalance = async (
  prevState?: AddBalanceFormState,
  formData?: FormData
) => {
  // zodバリデーションチェック
  const validatedFields = AddBalanceSchema.safeParse({
    title: formData?.get("title"),
    price: parseInt(formData?.get("price") as string),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "フィールドがありません。残高の追加に失敗しました。",
    };
  }
  const { title, price } = validatedFields.data;
  const newLog = {
    userId: userId,
    title: title,
    price: price,
    createdAt: new Date(),
  };

  // DB更新
  try {
    await prisma.$transaction(async (prisma) => {
      // 新しいログを作成
      await prisma.log.create({
        data: newLog,
      });
      // 残高を更新
      await prisma.balance.update({
        where: { userId: userId },
        data: { balance: { increment: price } },
      });
    });
  } catch {
    return {
      message: "データベースにて残高の追加に失敗しました。",
    };
  }
  revalidatePath("/main");
};

// ログ更新
export const updateLog = async (
  id: string,
  prevState?: UpdateLogFormState,
  formData?: FormData
) => {
  // zodバリデーションチェック
  const validatedFields = UpdateLogSchema.safeParse({
    id: id,
    title: formData?.get("title"),
    price: parseInt(formData?.get("price") as string),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "フィールドがありません。ログの更新に失敗しました。",
    };
  }
  const { title, price } = validatedFields.data;
  const updatedLog = {
    title: title,
    price: price,
  };

  // DB更新
  try {
    await prisma.$transaction(async (prisma) => {
      // 更新前の価格を取得
      const log = await prisma.log.findUnique({
        where: { id },
        select: { price: true },
      });

      if (!log) {
        throw new Error("指定されたログが見つかりません。");
      }

      // ログを更新
      await prisma.log.update({
        where: { id },
        data: updatedLog,
      });

      // バランスを直接計算して更新（更新前の価格との差分をインクリメント）
      await prisma.balance.update({
        where: { userId },
        data: {
          balance: { increment: price - log.price },
        },
      });
    });
  } catch {
    return {
      message: "データベースにてログの更新に失敗しました。",
    };
  }
  redirect("/logManagement");
};

// ログ削除
export const deleteLog = async (id: string, message?: string | null) => {
  // DB更新
  try {
    await prisma.$transaction(async (prisma) => {
      // ログを削除しつつ、price を取得
      const log = await prisma.log.delete({
        where: { id },
        select: { price: true }, // price フィールドのみ取得
      });

      // 残高からデクリメント
      await prisma.balance.update({
        where: { userId },
        data: { balance: { decrement: log.price } },
      });
    });
  } catch {
    message = "データベースにてログの削除に失敗しました。";
    return message;
  }
  redirect("/logManagement");
};

// 欲しいものリスト追加
export const addWantedItem = async (
  prevState?: AddWantedItemFormState,
  formData?: FormData
) => {
  // zodバリデーションチェック
  const validatedFields = AddWantedItemSchema.safeParse({
    name: formData?.get("name"),
    price: parseInt(formData?.get("price") as string),
    url: formData?.get("url"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "フィールドがありません。欲しいものリストへの追加に失敗しました。",
    };
  }
  const { name, price, url } = validatedFields.data;
  const newLog = {
    userId: userId,
    name: name,
    price: price,
    url: url,
    createdAt: new Date(),
  };

  // DB更新
  try {
    await prisma.wantedItem.create({
      data: newLog,
    });
  } catch {
    return {
      message: "データベースにて欲しいものリストへの追加に失敗しました。",
    };
  }
  revalidatePath("/wantedItemManagement");
};

// 欲しいものリスト更新
export const updateWantedItem = async (
  id: string,
  prevState?: UpdateWantedItemFormState,
  formData?: FormData
) => {
  // zodバリデーションチェック
  const validatedFields = UpdateWantedItemSchema.safeParse({
    id: id,
    name: formData?.get("name"),
    price: parseInt(formData?.get("price") as string),
    url: formData?.get("url"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "フィールドがありません。アイテムの更新に失敗しました。",
    };
  }
  const { name, price, url } = validatedFields.data;
  const updatedItem = {
    name: name,
    price: price,
    url: url,
  };

  // DB更新
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.wantedItem.update({
        where: { id },
        data: updatedItem,
      });
    });
  } catch {
    return {
      message: "データベースにてアイテムの更新に失敗しました。",
    };
  }
  redirect("/wantedItemManagement");
};

// 欲しいものリスト削除
export const deleteWantedItem = async (id: string, message?: string | null) => {
  // DB更新
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.wantedItem.delete({ where: { id } });
    });
  } catch {
    message = "データベースにてアイテムの削除に失敗しました。";
    return message;
  }
  redirect("/wantedItemManagement");
};
