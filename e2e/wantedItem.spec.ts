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
      where: { userId: 'cm6npti6z0000u5dctdbljjxi' },
      data: { balance: 0 },
    }),
    prisma.wantedItem.deleteMany({
      where: { userId: 'cm6npti6z0000u5dctdbljjxi' },
    }),
    prisma.log.deleteMany({
      where: { userId: 'cm6npti6z0000u5dctdbljjxi' },
    }),
  ])
}

describe('欲しい物リストページ', () => {
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
    // DBをリセット
    await dbReset()
  })
  describe('フォーム送信（アイテム追加）', () => {
    test('フォーム送信成功時（URLあり）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      //   フォーム入力
      await page.getByPlaceholder('商品名').fill('Refaドライヤー')
      await page.getByPlaceholder('価格').fill('30000')
      await page
        .getByPlaceholder('https://example.com')
        .fill('https://example.com')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムが最上列に追加され表示されていること
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 商品名の確認
      await expect(firstArticle.locator('h3')).toHaveText('Refaドライヤー')
      // 価格の確認
      await expect(firstArticle.locator('p')).toHaveText('Price: ¥30000')
      // 詳細リンクの確認
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
      ).toHaveAttribute('href', 'https://example.com')
    })
    test('フォーム送信成功時（URLなし）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // フォーム入力
      await page.getByPlaceholder('商品名').fill('Refaドライヤー')
      await page.getByPlaceholder('価格').fill('30000')
      // URLは空欄で送信
      await page.getByPlaceholder('https://example.com').fill('')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムが最上列に追加され表示されていること
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 商品名の確認
      await expect(firstArticle.locator('h3')).toHaveText('Refaドライヤー')
      // 価格の確認
      await expect(firstArticle.locator('p')).toHaveText('Price: ¥30000')
      // 詳細リンクの確認
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
      ).not.toBeVisible()
    })
    test('フォーム送信失敗時（商品名→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 価格のみ入力
      await page.getByPlaceholder('価格').fill('30000')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムがリストに追加されていないことをarticleの有無で確認
      await expect(
        page.locator('article:nth-of-type(1)'),
      ).not.toBeVisible()
    })
    test('フォーム送信失敗時（価格→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 商品名のみ入力
      await page.getByPlaceholder('商品名').fill('Refaドライヤー')
      // 送信
      await page.getByRole('button', { name: '追加' }).click()
      // アイテムがリストに追加されていないことをarticleの有無で確認
      await expect(
        page.locator('article:nth-of-type(1)'),
      ).not.toBeVisible()
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
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // 最上列のアイテムが編集されていること
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 商品名が変更されているか
      await expect(firstArticle.locator('h3')).toHaveText(
        'Panasonicドライヤー',
      )
      // 価格が変更されているか
      await expect(firstArticle.locator('p')).toHaveText('Price: ¥20000')
      // 詳細リンクが変更されているか
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
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
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // 最上列のアイテムから詳細リンクが消えているか
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 詳細リンクの確認
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
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
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // 最上列のアイテムに詳細リンクが表示されているか
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 詳細リンクの確認
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
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
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // 欲しい物リストページに遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 最上列のアイテムが編集されていないこと
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 商品名が変更されていないか
      await expect(firstArticle.locator('h3')).toHaveText('Refaドライヤー')
      // 価格が変更されていないか
      await expect(firstArticle.locator('p')).toHaveText('Price: ¥30000')
      // 詳細リンクが変更されていないか
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
      ).toHaveAttribute('href', 'https://example.com')
    })
    test('編集失敗（価格→バリデーションエラー）', async () => {
      // 欲しい物リストにアイテムを追加
      await prisma.wantedItem.create({
        data: {
          id: 'testId',
          name: 'Refaドライヤー',
          price: 30000,
          url: 'https://example.com',
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // 欲しい物リストページに遷移
      await page.goto('http://localhost:3000/wantedItemManagement')
      // 最上列のアイテムが編集されていないこと
      // 1行目のarticleを取得
      const firstArticle = page.locator('article:nth-of-type(1)')
      // 商品名が変更されていないか
      await expect(firstArticle.locator('h3')).toHaveText('Refaドライヤー')
      // 価格が変更されていないか
      await expect(firstArticle.locator('p')).toHaveText('Price: ¥30000')
      // 詳細リンクが変更されていないか
      await expect(
        firstArticle.locator('a:has-text("詳細を見る")'),
      ).toHaveAttribute('href', 'https://example.com')
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
          userId: 'cm6npti6z0000u5dctdbljjxi',
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
      // ほしい物リストからアイテムが削除されていることをarticleの有無で確認
      await expect(
        page.locator('article:nth-of-type(1)'),
      ).not.toBeVisible()
    })
  })
})
