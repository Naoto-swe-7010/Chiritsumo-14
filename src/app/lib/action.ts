"use server";

import { z } from "zod";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// schema
const LogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string({ invalid_type_error: "タイトルは文字列で入力してください" }),
  price: z.number({ invalid_type_error: "価格は数値で入力してください" }),
  createdAt: z.date(),
});

const AddBalanceSchema = LogSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

const UpdateLogSchema = LogSchema.omit({
  userId: true,
  createdAt: true,
});

const WantedItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string({ invalid_type_error: "商品名は文字列で入力してください" }),
  price: z.number({ invalid_type_error: "価格は数値で入力してください" }),
  url: z.string({ invalid_type_error: "URLは文字列で入力してください" }),
  createdAt: z.date(),
});

const AddWantedItemSchema = WantedItemSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

// State
export type AddBalanceFormState = {
  errors?: {
    title?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type UpdateLogFormState = {
  errors?: {
    id?: string[];
    title?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type DeleteLogFormState = {
  message?: string | null;
};

export type AddWantedItemFormState = {
  errors?: {
    name?: string[];
    price?: string[];
    url?: string[];
  };
  message?: string | null;
};

// action
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

  const session = await auth();
  const newLog = {
    userId: session!.user!.id!,
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
        where: { userId: session!.user!.id },
        data: { balance: { increment: price } },
      });
    });
  } catch (e) {
    return {
      message: "データベースにて残高の追加に失敗しました。",
    };
  }
  revalidatePath("/main");
  return {
    message: `残高が追加されました。: ${new Date().toLocaleString()}`,
  };
};

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

  const session = await auth();

  const updatedLog = {
    title: title,
    price: price,
  };

  try {
    await prisma.$transaction(async (prisma) => {
      const log = await prisma.log.findUnique({ where: { id } });

      // 古い価格を引いて、新しい価格を足す
      const balanceUpdate = {
        balance: { increment: price - log!.price },
      };

      // バランス更新
      await prisma.balance.update({
        where: { userId: session!.user!.id },
        data: balanceUpdate,
      });

      // ログ更新
      await prisma.log.update({
        where: { id },
        data: updatedLog,
      });
    });
  } catch (e) {
    return {
      message: "データベースにてログの更新に失敗しました。",
    };
  }
  revalidatePath("/logManagement");
  redirect("/logManagement");
};

export const deleteLog = async (id: string, prevState?: DeleteLogFormState) => {
  const session = await auth();
  try {
    await prisma.$transaction(async (prisma) => {
      const log = await prisma.log.findUnique({ where: { id } });

      // バランス更新
      await prisma.balance.update({
        where: { userId: session!.user!.id },
        data: { balance: { decrement: log!.price } },
      });

      // ログ削除
      await prisma.log.delete({ where: { id } });
    });
  } catch (e) {
    return {
      message: "データベースにてログの削除に失敗しました。",
    };
  }
  revalidatePath("/logManagement");
  redirect("/logManagement");
};

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

  const session = await auth();
  const newLog = {
    userId: session!.user!.id!,
    name: name,
    price: price,
    url: url,
    createdAt: new Date(),
  };

  try {
    await prisma.wantedItem.create({
      data: newLog,
    });
  } catch (e) {
    return {
      message: "データベースにて欲しいものリストへの追加に失敗しました。",
    };
  }
  revalidatePath("/wantedItemManagement");

  return {
    message: "欲しいものリストに追加されました。",
  };
};
