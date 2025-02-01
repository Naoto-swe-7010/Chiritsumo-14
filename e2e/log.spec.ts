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
    // 残高：5000円
    // ログ: 1件 (飲み会：5000円)
    // 欲しい物リスト：0件
    await dbReset()
    await prisma.balance.update({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
      data: { balance: 5000 },
    })
    await prisma.log.create({
      data: {
        id: 'testId',
        userId: 'cm5nvvavn0000u5jqdeqvsi5l',
        title: '飲み会',
        price: 5000,
        createdAt: new Date(),
      },
    })
    //////////////////////////////////////////////////////////////
  })
  test.afterEach(async () => {
    // ブラウザコンテキストを閉じる
    await context.close()
    // DBをリセット
    await dbReset()
  })
  describe('ログ編集', () => {
    test('編集成功', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // 編集ボタンを押下
      await page.getByRole('button', { name: '編集' }).click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // タイトル編集
      await page.getByPlaceholder('タイトル').click()
      await page.getByPlaceholder('タイトル').fill('飲み会2次会')
      // 金額編集
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('3000')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/logTable/1',
      )
      // タイトルが変更されているか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)',
        ),
      ).toHaveText('飲み会2次会')
      // 金額が変更されているか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)',
        ),
      ).toHaveText('3000')
      // ホームに遷移
      await page.goto('http://localhost:3000/main')
      // 残高が正しく変更されているか（差額の-2000円されているか）
      await expect(
        page.getByRole('heading', { name: 'balance' }),
      ).toHaveText('3000')
    })
    test('編集失敗（タイトル＋金額→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // 編集ボタンを押下
      await page.getByRole('button', { name: '編集' }).click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // タイトル編集
      await page.getByPlaceholder('タイトル').click()
      await page.getByPlaceholder('タイトル').fill('')
      // 金額編集
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移しない
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // タイトルが変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)',
        ),
      ).toHaveText('飲み会')
      // 金額が変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)',
        ),
      ).toHaveText('5000')
      // ホームに遷移
      await page.goto('http://localhost:3000/main')
      // 残高が変更されていないか
      await expect(
        page.getByRole('heading', { name: 'balance' }),
      ).toHaveText('5000')
    })
    test('編集失敗（タイトル→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // 編集ボタンを押下
      await page.getByRole('button', { name: '編集' }).click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // タイトル編集
      await page.getByPlaceholder('タイトル').click()
      await page.getByPlaceholder('タイトル').fill('')
      // 金額編集
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('3000')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移しない
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // タイトルが変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)',
        ),
      ).toHaveText('飲み会')
      // 金額が変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)',
        ),
      ).toHaveText('5000')
      // ホームに遷移
      await page.goto('http://localhost:3000/main')
      // 残高が変更されていないか
      await expect(
        page.getByRole('heading', { name: 'balance' }),
      ).toHaveText('5000')
    })
    test('編集失敗（金額→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // 編集ボタンを押下
      await page.getByRole('button', { name: '編集' }).click()
      // 編集ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // タイトル編集
      await page.getByPlaceholder('タイトル').click()
      await page.getByPlaceholder('タイトル').fill('飲み会2次会')
      // 金額編集
      await page.getByPlaceholder('値段').click()
      await page.getByPlaceholder('値段').fill('')
      // 保存ボタン押下
      await page.getByRole('button', { name: '保存' }).click()
      // ログページに遷移しない
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/edit/testId',
      )
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // タイトルが変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)',
        ),
      ).toHaveText('飲み会')
      // 金額が変更されていないか
      await expect(
        page.locator(
          'table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)',
        ),
      ).toHaveText('5000')
      // ホームに遷移
      await page.goto('http://localhost:3000/main')
      // 残高が変更されていないか
      await expect(
        page.getByRole('heading', { name: 'balance' }),
      ).toHaveText('5000')
    })
  })
  describe('ログ削除', () => {
    test('削除成功', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1')
      // 削除ボタンを押下
      await page.getByRole('button', { name: '削除' }).click()
      // 削除確認ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/delete/testId',
      )
      // はい（削除）ボタンを押下
      await page.getByRole('button', { name: 'はい' }).click()
      // ログページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/logManagement/logTable/1',
      )
      // ログが削除されたか
      await expect(page.getByText('ログがありません。')).toBeVisible()
      // ホームに遷移
      await page.goto('http://localhost:3000/main')
      // 残高が正しく変更されているか（差額の-5000円されて0円になっているか）
      await expect(
        page.getByRole('heading', { name: 'balance' }),
      ).toHaveText('0')
    })
  })
})
