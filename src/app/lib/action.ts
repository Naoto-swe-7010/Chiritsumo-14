'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '../../../prisma'
import {
  AddBalanceSchema,
  AddWantedItemSchema,
  UpdateLogSchema,
  UpdateWantedItemSchema,
} from './schema'
import {
  AddBalanceFormState,
  AddWantedItemFormState,
  UpdateLogFormState,
  UpdateWantedItemFormState,
} from './formState'
import { getSessionAndUserId } from './commonFunction'

// 残高追加（ログ作成）////////////////////////////////////////////////////
export const addBalance = async (
  prevState?: AddBalanceFormState,
  formData?: FormData,
) => {
  const userId = await getSessionAndUserId()

  // zodバリデーションチェック
  const validatedFields = AddBalanceSchema.safeParse({
    title: formData?.get('title'),
    price: parseInt(formData?.get('price') as string),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。残高の追加に失敗しました。',
    }
  }
  const { title, price } = validatedFields.data

  // DB処理
  try {
    await prisma.$transaction(async tx => {
      await tx.log.create({
        data: { userId, title, price, createdAt: new Date() },
      })
      await tx.balance.update({
        where: { userId },
        data: { balance: { increment: price } },
      })
    })
  } catch (error) {
    console.error('残高追加中にエラーが発生しました:', error)
    return { message: 'データベースにて残高の追加に失敗しました。' }
  }
  revalidatePath('/main')
  return { message: `残高を追加しました。${Math.random()} ` }
}

// ログ更新 ////////////////////////////////////////////////////
export const updateLog = async (
  id: string,
  prevState?: UpdateLogFormState,
  formData?: FormData,
) => {
  const userId = await getSessionAndUserId()

  // zodバリデーションチェック
  const validatedFields = UpdateLogSchema.safeParse({
    id,
    title: formData?.get('title'),
    price: parseInt(formData?.get('price') as string),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。ログの更新に失敗しました。',
    }
  }
  const { title, price } = validatedFields.data

  // DB処理
  try {
    await prisma.$transaction(async tx => {
      const log = await tx.log.findUnique({
        where: { id },
        select: { price: true },
      })
      if (!log) throw new Error('指定されたログが見つかりません。')

      await tx.log.update({ where: { id }, data: { title, price } })
      await tx.balance.update({
        where: { userId },
        data: { balance: { increment: price - log.price } },
      })
    })
  } catch (error) {
    console.error('ログ更新中にエラーが発生しました:', error)
    return { message: 'データベースにてログの更新に失敗しました。' }
  }
  redirect('/logManagement/logTable/1')
}

// ログ削除 ////////////////////////////////////////////////////
export const deleteLog = async (id: string) => {
  const userId = await getSessionAndUserId()

  // DB処理
  try {
    await prisma.$transaction(async tx => {
      const log = await tx.log.delete({
        where: { id },
        select: { price: true },
      })
      await tx.balance.update({
        where: { userId },
        data: { balance: { decrement: log.price } },
      })
    })
  } catch (error) {
    console.error('ログ削除中にエラーが発生しました:', error)
    return { message: 'データベースにてログの削除に失敗しました。' }
  }
  redirect('/logManagement/logTable/1')
}

// 欲しい物リスト追加 ////////////////////////////////////////////////////
export const addWantedItem = async (
  prevState?: AddWantedItemFormState,
  formData?: FormData,
) => {
  const userId = await getSessionAndUserId()

  // zodバリデーションチェック
  const validatedFields = AddWantedItemSchema.safeParse({
    name: formData?.get('name'),
    price: parseInt(formData?.get('price') as string),
    url: formData?.get('url'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'フィールドがありません。欲しい物リストへの追加に失敗しました。',
    }
  }

  // DB処理
  try {
    await prisma.wantedItem.create({
      data: { userId, ...validatedFields.data, createdAt: new Date() },
    })
  } catch (error) {
    console.error('欲しい物リスト追加中にエラーが発生しました:', error)
    return {
      message: 'データベースにて欲しい物リストへの追加に失敗しました。',
    }
  }
  revalidatePath('/wantedItemManagement')
  return {
    message: `欲しい物リストにアイテムを追加しました。${Math.random()} `,
  }
}

// 欲しい物リスト更新 ////////////////////////////////////////////////////
export const updateWantedItem = async (
  id: string,
  prevState?: UpdateWantedItemFormState,
  formData?: FormData,
) => {
  // zodバリデーションチェック
  const validatedFields = UpdateWantedItemSchema.safeParse({
    id,
    name: formData?.get('name'),
    price: parseInt(formData?.get('price') as string),
    url: formData?.get('url'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フィールドがありません。アイテムの更新に失敗しました。',
    }
  }

  // DB処理
  try {
    await prisma.wantedItem.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    console.error('欲しい物リスト更新中にエラーが発生しました:', error)
    return { message: 'データベースにてアイテムの更新に失敗しました。' }
  }
  redirect('/wantedItemManagement')
}

// 欲しい物リスト購入 ////////////////////////////////////////////////////
export const purchaseWantedItem = async (id: string) => {
  const userId = await getSessionAndUserId()

  // DB処理
  try {
    await prisma.$transaction(async tx => {
      const buyWantedItem = await tx.wantedItem.delete({
        where: { id },
        select: { price: true },
      })
      await tx.balance.update({
        where: { userId },
        data: { balance: { decrement: buyWantedItem.price } },
      })
    })
  } catch (error) {
    console.error('欲しい物リスト購入中にエラーが発生しました:', error)
    return { message: 'データベースにてアイテムの購入に失敗しました。' }
  }
  redirect('/main/purchaseWantedItem/postPurchase')
}

// 欲しい物リスト削除 ////////////////////////////////////////////////////
export const deleteWantedItem = async (id: string) => {
  // DB処理
  try {
    await prisma.wantedItem.delete({ where: { id } })
  } catch (error) {
    console.error('欲しい物リスト削除中にエラーが発生しました:', error)
    return { message: 'データベースにてアイテムの削除に失敗しました。' }
  }
  redirect('/wantedItemManagement')
}
