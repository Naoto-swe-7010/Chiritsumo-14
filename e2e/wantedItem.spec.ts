import { test, expect } from '@playwright/test'
import { prisma } from '../prisma'
import { describe } from 'node:test'

// あらかじめSessionテーブルにテストユーザと紐づくレコードを作成しておく
// await prisma.session.create({
//   data: {
//     sessionToken: 'dummy',
//     userId: 'cm5nvvavn0000u5jqdeqvsi5l',
//     expires: new Date(new Date().getTime() + 86400),
//   },
// })

let context: any // 各テストで共有するブラウザコンテキスト
let page: any // 各テストで共有するページ

// DBの各テーブルをリセット
const dbReset = async () => {
  await prisma.$transaction([
    prisma.balance.update({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
      data: { balance: 0 },
    }),
    prisma.wantedItem.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    }),
    prisma.log.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    }),
  ])
}

describe('ログページ', () => {
  test.beforeEach(async ({ browser }) => {
    // ブラウザ準備 ///////////////////////////////////////////////

    // 新しいブラウザコンテキストを作成
    context = await browser.newContext()
    // Google認証用のCookieを保存
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: 'dummy',
        domain: 'localhost',
        path: '/',
      },
    ])
    // 新しいページを作成
    page = await context.newPage()

    // データ準備 ///////////////////////////////////////////////
    // 残高：0円
    // ログ: 0件
    // 欲しい物リスト：0件

    await dbReset()
    //////////////////////////////////////////////////////////////
  })
  test.afterEach(async () => {
    // ブラウザコンテキストを閉じる
    await context.close()

    await dbReset()
  })
  describe('フォーム送信', () => {
    test('フォーム送信成功時（URLあり）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      //   フォーム入力
      await page.getByPlaceholder('商品名').type('Refaドライヤー')
      await page.getByPlaceholder('価格').type('30000')
      await page
        .getByPlaceholder('https://example.com')
        .type('https://example.com')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムが追加され表示されていること
      // 商品名
      await expect(page.getByText('Refaドライヤー')).toBeVisible()
      // 価格
      await expect(page.getByText('Price: ¥30000')).toBeVisible()
      // 詳細リンク
      await expect(
        page.getByRole('link', { name: '詳細を見る' }),
      ).toHaveAttribute('href', 'https://example.com')
    })
    test('フォーム送信成功時（URLなし）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // フォーム入力
      await page.getByPlaceholder('商品名').type('Refaドライヤー')
      await page.getByPlaceholder('価格').type('30000')
      // URLは空欄で送信
      await page.getByPlaceholder('https://example.com').type('')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムが追加され表示されていること
      // 商品名
      await expect(page.getByText('Refaドライヤー')).toBeVisible()
      // 価格
      await expect(page.getByText('Price: ¥30000')).toBeVisible()
      // 詳細リンクは表示されない
      await expect(
        page.getByRole('link', { name: '詳細を見る' }),
      ).not.toBeVisible()
    })
    test('フォーム送信失敗時（商品名→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 価格のみ入力
      await page.getByPlaceholder('価格').type('30000')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // 欲しい物リストに追加されていないことを価格の表示で確認
      await expect(page.getByText('Price: ¥30000')).not.toBeVisible()
    })
    test('フォーム送信失敗時（価格→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 商品名のみ入力
      await page.getByPlaceholder('商品名').type('Refaドライヤー')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // 欲しい物リストに追加されていないことを商品名の表示で確認
      await expect(page.getByText('Refaドライヤー')).not.toBeVisible()
    })
  })
  describe('アイテム編集', () => {
    test('編集成功', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 編集ボタンを押下
      await page
        .getByRole('button', { name: 'Edit Refaドライヤー' })
        .click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
      // 商品名編集
      await page.getByPlaceholder('商品名').click()
      await page.getByPlaceholder('商品名').fill('Panasonicドライヤー')
      // 価格編集
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('20000')
      // URL編集
      await page.getByPlaceholder('https://example.com').click()
      await page
        .getByPlaceholder('https://example.com')
        .fill('https://example2.com')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement',
      )
      // 商品名が変更されているか
      await expect(page.getByText('Panasonicドライヤー')).toBeVisible()
      // 価格が変更されているか
      await expect(page.getByText('Price: ¥20000')).toBeVisible()
      // URLが変更されているか
      await expect(
        page.getByRole('link', { name: '詳細を見る' }),
      ).toHaveAttribute('href', 'https://example2.com')
    })
    test('編集成功（URLあり→なし）', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 編集ボタンを押下
      await page
        .getByRole('button', { name: 'Edit Refaドライヤー' })
        .click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
      // URLを削除
      await page.getByPlaceholder('https://example.com').click()
      await page.getByPlaceholder('https://example.com').fill('')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement',
      )
      // 詳細リンクが表示されていないか
      await expect(
        page.getByRole('link', { name: '詳細を見る' }),
      ).not.toBeVisible()
    })
    test('編集成功（URLなし→あり）', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: null,
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 編集ボタンを押下
      await page
        .getByRole('button', { name: 'Edit Refaドライヤー' })
        .click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
      // URLを入力
      await page.getByPlaceholder('https://example.com').click()
      await page
        .getByPlaceholder('https://example.com')
        .fill('https://example.com')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement',
      )
      // 詳細リンクが表示されているか
      await expect(
        page.getByRole('link', { name: '詳細を見る' }),
      ).toHaveAttribute('href', 'https://example.com')
    })
    test('編集失敗（商品名→バリデーションエラー）', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 編集ボタンを押下
      await page
        .getByRole('button', { name: 'Edit Refaドライヤー' })
        .click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
      // 商品名を削除
      await page.getByPlaceholder('商品名').click()
      await page.getByPlaceholder('商品名').fill('')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // 編集ページに留まっているか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
    })
    test('編集失敗（価格→バリデーションエラー）', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 編集ボタンを押下
      await page
        .getByRole('button', { name: 'Edit Refaドライヤー' })
        .click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
      // 価格を削除
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // 編集ページに留まっているか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/edit/testId',
      )
    })
  })
  describe('アイテム削除', () => {
    test('削除成功', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        },
      })
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 削除ボタンを押下
      await page
        .getByRole('button', { name: 'Delete Refaドライヤー' })
        .click()
      // 削除確認ページに遷移するか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement/delete/testId',
      )
      // はい（削除）ボタンを押下
      await page.getByRole('button', { name: 'はい' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/wantedItemManagement',
      )
      // 欲しい物リストにアイテムが表示されていないか
      await expect(page.getByText('Refaドライヤー')).not.toBeVisible()
    })
  })
})
