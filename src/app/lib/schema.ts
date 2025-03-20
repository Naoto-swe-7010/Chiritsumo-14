import { z } from 'zod'

// Zodバリデーションチェック用Schema
export const LogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string({
    invalid_type_error: 'タイトルは文字列で入力してください',
  }),
  price: z.number({ invalid_type_error: '価格は数値で入力してください' }),
  createdAt: z.date(),
})

export const AddBalanceSchema = LogSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
})

export const UpdateLogSchema = LogSchema.omit({
  userId: true,
  createdAt: true,
})

export const WantedItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string({
    invalid_type_error: '商品名は文字列で入力してください',
  }),
  price: z.number({ invalid_type_error: '価格は数値で入力してください' }),
  url: z.string({ invalid_type_error: 'URLは文字列で入力してください' }),
  createdAt: z.date(),
})

export const AddWantedItemSchema = WantedItemSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
})

export const UpdateWantedItemSchema = WantedItemSchema.omit({
  userId: true,
  createdAt: true,
})

export const AIAdviceSchema = z.object({
  keyword: z.string({
    invalid_type_error: 'キーワードは文字列で入力してください',
  }),
})
