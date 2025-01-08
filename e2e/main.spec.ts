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

describe('メインページ', () => {
  test('フォーム送信', async ({ browser }) => {
    // Googole認証を突破するために、ブラウザにセッションのCookieを保存する
    const context = await browser.newContext()
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: 'dummy',
        domain: 'localhost:3000',
        path: '/',
      },
    ])
    // 残高をリセット
    await prisma.balance.update({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
      data: { balance: 0 },
    })
    // 欲しい物リストをリセット
    await prisma.wantedItem.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    })
    // 欲しい物リストにアイテムを用意
    await prisma.wantedItem.create({
      data: {
        createdAt: new Date(),
        price: 20000,
        name: 'Nintendo Switch',
        url: 'https://example.com',
        userId: 'cm5nvvavn0000u5jqdeqvsi5l',
      },
    })
    // ログをリセット
    await prisma.log.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    })

    // ページ遷移
    const page = await context.newPage()
    await page.goto('http://localhost:3000/main')

    // フォーム送信成功時
    // 内容が残高に加算され、欲しい物アイテムの進捗率（％）に更新がかかる
    await page.getByPlaceholder('我慢したものを入力').click()
    await page.getByPlaceholder('我慢したものを入力').fill('飲み会')
    await page.getByPlaceholder('節約できた額を入力').click()
    await page.getByPlaceholder('節約できた額を入力').fill('5000')
    await page.getByRole('button', { name: '我慢できた！' }).click()
    await expect(page.getByText('5000')).toBeVisible()
    await expect(page.getByText('25%')).toBeVisible()
    // ログページにログが作成される
    await page.goto('http://localhost:3000/logManagement/logTable/1')
    await expect(page.getByText('飲み会')).toBeVisible()
    await expect(page.getByText('5000')).toBeVisible()

    // フォーム送信失敗時（空で送信された時）
    // 残高と欲しい物アイテムの進捗率共に変更されない
    await page.goto('http://localhost:3000/main')
    await page.getByRole('button', { name: '我慢できた！' }).click()
    await expect(page.getByText('5000')).toBeVisible()
  })

  test('欲しい物購入', async ({ browser }) => {
    // Googole認証を突破するために、ブラウザにセッションのCookieを保存する
    const context = await browser.newContext()
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: 'dummy',
        domain: 'localhost:3000',
        path: '/',
      },
    ])
    // 残高をリセット
    await prisma.balance.update({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
      data: { balance: 50000 },
    })
    // 欲しい物リストをリセット
    await prisma.wantedItem.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    })
    // 欲しい物リストにアイテムを用意
    await prisma.wantedItem.create({
      data: {
        createdAt: new Date(),
        price: 20000,
        name: 'Nintendo Switch',
        url: 'https://example.com',
        userId: 'cm5nvvavn0000u5jqdeqvsi5l',
      },
    })
    // ログをリセット
    await prisma.log.deleteMany({
      where: { userId: 'cm5nvvavn0000u5jqdeqvsi5l' },
    })

    // ページ遷移
    const page = await context.newPage()
    await page.goto('http://localhost:3000/main')
    // アイテム（Nintendo Switch）購入
    await page.getByRole('button', { name: '購入' }).click()
    // 購入ページにアイテム名（Nintendo Switch）の記載があるか
    await expect(
      page.getByRole('heading', { name: 'Nintendo Switch' }),
    ).toBeVisible()
    // 購入しますか？の問いに「はい」を選択
    await page.getByRole('button', { name: 'はい' }).click()
    // 購入完了ページに遷移するか
    await expect(
      page.getByRole('heading', { name: '残高を消費しました！' }),
    ).toBeVisible()
    // ホームに戻るボタンを押下
    await page.getByRole('button', { name: 'ホームに戻る' }).click()
    // 残高が元の50000から購入アイテム代20000を引いた、30000になっているか
    await expect(page.getByText('30000')).toBeVisible()
  })
})
