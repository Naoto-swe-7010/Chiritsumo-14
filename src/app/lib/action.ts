'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';

import { prisma } from '../../../prisma';
import { getSessionAndUserId } from './commonFunction';
import {
  AddBalanceFormState,
  AddWantedItemFormState,
  UpdateLogFormState,
  UpdateWantedItemFormState
} from './formState';
import {
  AddBalanceSchema,
  AddWantedItemSchema,
  AIAdviceSchema,
  UpdateLogSchema,
  UpdateWantedItemSchema
} from './schema';

// 残高追加（ログ作成）////////////////////////////////////////////////////
export const addBalance = async (
  prevState?: AddBalanceFormState,
  formData?: FormData
) => {
  const userId = await getSessionAndUserId();

  // zodバリデーションチェック
  const validatedFields = AddBalanceSchema.safeParse({
    title: formData?.get('title'),
    price: parseInt(formData?.get('price') as string)
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。残高の追加に失敗しました。'
    };
  }
  const { title, price } = validatedFields.data;

  // DB処理
  try {
    await prisma.$transaction(async (tx) => {
      await tx.log.create({
        data: {
          userId,
          title,
          price,
          createdAt: new Date()
        }
      });
      await tx.balance.update({
        where: { userId },
        data: { balance: { increment: price } }
      });
    });
  } catch {
    return {
      message: 'データベースにて残高の追加に失敗しました。'
    };
  }
  revalidatePath('/main');
  return {
    message: `残高を追加しました。${Math.random().toString()} `
  };
};

// ログ更新 ////////////////////////////////////////////////////
export const updateLog = async (
  id: string,
  prevState?: UpdateLogFormState,
  formData?: FormData
) => {
  const userId = await getSessionAndUserId();

  // zodバリデーションチェック
  const validatedFields = UpdateLogSchema.safeParse({
    id,
    title: formData?.get('title'),
    price: parseInt(formData?.get('price') as string)
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。ログの更新に失敗しました。'
    };
  }
  const { title, price } = validatedFields.data;

  // DB処理
  try {
    await prisma.$transaction(async (tx) => {
      const log = await tx.log.findUnique({
        where: { id },
        select: { price: true }
      });
      if (!log) throw new Error('指定されたログが見つかりません。');

      await tx.log.update({
        where: { id },
        data: { title, price }
      });
      await tx.balance.update({
        where: { userId },
        data: {
          balance: {
            increment: price - log.price
          }
        }
      });
    });
  } catch {
    return {
      message: 'データベースにてログの更新に失敗しました。'
    };
  }
  redirect('/logManagement/logTable/1');
};

// ログ削除 ////////////////////////////////////////////////////
export const deleteLog = async (id: string) => {
  const userId = await getSessionAndUserId();

  // DB処理
  try {
    await prisma.$transaction(async (tx) => {
      const log = await tx.log.delete({
        where: { id },
        select: { price: true }
      });
      await tx.balance.update({
        where: { userId },
        data: {
          balance: {
            decrement: log.price
          }
        }
      });
    });
  } catch {
    return {
      message: 'データベースにてログの削除に失敗しました。'
    };
  }
  redirect('/logManagement/logTable/1');
};

// 欲しい物リスト追加 ////////////////////////////////////////////////////
export const addWantedItem = async (
  prevState?: AddWantedItemFormState,
  formData?: FormData
) => {
  const userId = await getSessionAndUserId();

  // zodバリデーションチェック
  const validatedFields = AddWantedItemSchema.safeParse({
    name: formData?.get('name'),
    price: parseInt(formData?.get('price') as string),
    url: formData?.get('url')
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。欲しい物リストへの追加に失敗しました。'
    };
  }

  // DB処理
  try {
    await prisma.wantedItem.create({
      data: {
        userId,
        ...validatedFields.data,
        createdAt: new Date()
      }
    });
  } catch {
    return {
      message: 'データベースにて欲しい物リストへの追加に失敗しました。'
    };
  }
  revalidatePath('/wantedItemManagement');
  return {
    message: `欲しい物リストにアイテムを追加しました。${Math.random().toString()} `
  };
};

// 欲しい物リスト更新 ////////////////////////////////////////////////////
export const updateWantedItem = async (
  id: string,
  prevState?: UpdateWantedItemFormState,
  formData?: FormData
) => {
  // zodバリデーションチェック
  const validatedFields = UpdateWantedItemSchema.safeParse({
    id,
    name: formData?.get('name'),
    price: parseInt(formData?.get('price') as string),
    url: formData?.get('url')
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。アイテムの更新に失敗しました。'
    };
  }

  // DB処理
  try {
    await prisma.wantedItem.update({
      where: { id },
      data: validatedFields.data
    });
  } catch {
    return {
      message: 'データベースにてアイテムの更新に失敗しました。'
    };
  }
  redirect('/wantedItemManagement');
};

// 欲しい物リスト購入 ////////////////////////////////////////////////////
export const purchaseWantedItem = async (id: string) => {
  const userId = await getSessionAndUserId();

  // DB処理
  try {
    await prisma.$transaction(async (tx) => {
      const buyWantedItem = await tx.wantedItem.delete({
        where: { id },
        select: { price: true }
      });
      await tx.balance.update({
        where: { userId },
        data: {
          balance: {
            decrement: buyWantedItem.price
          }
        }
      });
    });
  } catch {
    return {
      message: 'データベースにてアイテムの購入に失敗しました。'
    };
  }
  redirect('/main/purchaseWantedItem/postPurchase');
};

// 欲しい物リスト削除 ////////////////////////////////////////////////////
export const deleteWantedItem = async (id: string) => {
  // DB処理
  try {
    await prisma.wantedItem.delete({ where: { id } });
  } catch {
    return {
      message: 'データベースにてアイテムの削除に失敗しました。'
    };
  }
  redirect('/wantedItemManagement');
};

// AI節約アドバイス ////////////////////////////////////////////////////
export const getAIAdvice = async (prevState: string, formData?: FormData) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });
  const validatedFields = AIAdviceSchema.safeParse({
    keyword: formData?.get('keyword')
  });
  if (!validatedFields.success) {
    return '';
  }
  const { keyword } = validatedFields.data;

  try {
    const prompt = `あなたは賢明な節約アドバイザーです。
        ${keyword}に関する節約アドバイスを提供してください。
        ・アドバイス口調で出力してください。
        ・必ず70文字以内で出力してください。`;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 2000
    });
    const advice = response.choices[0].message.content;
    if (!advice) {
      return 'AIから返答がありませんでした。再度お試しください。';
    }
    return advice;
  } catch {
    return 'AIから返答がありませんでした。再度お試しください。';
  }
};

function add(a: number, b: number) {
  return a + b;
}
