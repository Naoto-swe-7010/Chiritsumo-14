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
  try {
    await prisma.$transaction(async (prisma) => {
      // 新しいログを作成
      await prisma.log.create({
        data: newLog,
      });
      // バランスを更新
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

  try {
    await prisma.$transaction(async (prisma) => {
      // ログ更新と同時に古い価格を取得
      const log = await prisma.log.update({
        where: { id },
        data: updatedLog,
        select: { price: true }, // 古い価格のみ取得
      });
      // バランスを直接計算して更新
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
  try {
    await prisma.$transaction(async (prisma) => {
      // ログを削除しつつ、price を取得
      const log = await prisma.log.delete({
        where: { id },
        select: { price: true }, // price フィールドのみ取得
      });

      // バランスを減算
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
