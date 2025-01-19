import { Log, WantedItem } from '@prisma/client'

// 共通のエラーメッセージ型
type ErrorMessages<T> = Partial<Record<keyof T, string[]>>

// 各フォームステートの型定義
export type AddBalanceFormState = {
  errors?: ErrorMessages<Pick<Log, 'title' | 'price'>>
  message?: string | null
}

export type UpdateLogFormState = {
  errors?: ErrorMessages<Pick<Log, 'id' | 'title' | 'price'>>
  message?: string | null
}

export type AddWantedItemFormState = {
  errors?: ErrorMessages<Pick<WantedItem, 'name' | 'price' | 'url'>>
  message?: string | null
}

export type UpdateWantedItemFormState = {
  errors?: ErrorMessages<Pick<WantedItem, 'id' | 'name' | 'price' | 'url'>>
  message?: string | null
}
