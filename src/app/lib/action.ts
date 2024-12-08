"use server";

import { z } from "zod";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { revalidatePath } from "next/cache";
import { url } from "inspector";

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
    await prisma.log.create({
      data: newLog,
    });
    await prisma.balance.update({
      where: { userId: session!.user!.id },
      data: { balance: { increment: price } },
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
