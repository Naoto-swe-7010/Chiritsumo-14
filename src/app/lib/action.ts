"use server";

import { z } from "zod";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { revalidatePath } from "next/cache";
import confetti from "canvas-confetti";

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

// State
export type State = {
  errors?: {
    title?: string[];
    price?: string[];
  };
  message?: string | null;
};

// action
export const addBalance = async (prevState?: State, formData?: FormData) => {
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
    message: "残高が追加されました。",
  };
};
