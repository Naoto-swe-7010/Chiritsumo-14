import { describe } from 'node:test';
import { expect, test } from '@playwright/test';

import { prisma } from '../prisma';

// あらかじめSessionテーブルにテストユーザと紐づくレコードを作成しておく
// await prisma.session.create({
//   data: {
//     sessionToken: 'dummy',
//     userId: 'cm8d1l5cq0000u5ddbbrto25t',
//     expires: new Date(new Date().getTime() + 86400),
//   },
// })

let context: any; // 各テストで共有するブラウザコンテキスト
let page: any; // 各テストで共有するページ

// DBの各テーブルをリセット
const dbReset = async () => {
  await prisma.$transaction([
    prisma.balance.update({
      where: { userId: 'cm8d1l5cq0000u5ddbbrto25t' },
      data: { balance: 0 }
    }),
    prisma.wantedItem.deleteMany({
      where: { userId: 'cm8d1l5cq0000u5ddbbrto25t' }
    }),
    prisma.log.deleteMany({
      where: { userId: 'cm8d1l5cq0000u5ddbbrto25t' }
    })
  ]);
};

describe('メインページ', () => {
  test.beforeEach(async ({ browser }) => {
    // ブラウザ準備 ///////////////////////////////////////////////
    // 新しいブラウザコンテキストを作成
    context = await browser.newContext();
    // Google認証用のCookieを保存
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: 'dummy',
        domain: 'localhost',
        path: '/'
      }
    ]);
    // 新しいページを作成
    page = await context.newPage();
    // データ準備 ///////////////////////////////////////////////
    // 残高：0円
    // ログ: 0件
    // 欲しい物リスト：１件（Nintendo Switch）
    await dbReset();
    // 欲しい物リストにアイテムを用意
    await prisma.wantedItem.create({
      data: {
        id: 'testId',
        createdAt: new Date(),
        price: 20000,
        name: 'Nintendo Switch',
        url: 'https://example.com',
        userId: 'cm8d1l5cq0000u5ddbbrto25t'
      }
    });
    //////////////////////////////////////////////////////////////
  });
  test.afterEach(async () => {
    // ブラウザコンテキストを閉じる
    await context.close();
    // DBをリセット
    await dbReset();
  });
  describe('フォーム送信', () => {
    test('フォーム送信成功時', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/main');
      // フォーム入力(飲み会：5000円)
      await page.getByPlaceholder('我慢したものを入力').click();
      await page.getByPlaceholder('我慢したものを入力').fill('飲み会');
      await page.getByPlaceholder('節約できた額を入力').click();
      await page.getByPlaceholder('節約できた額を入力').fill('5000');
      // 送信
      await page
        .getByRole('button', {
          name: '我慢できた！'
        })
        .click();
      // 残高が正しく増える（5000円）
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('5000');
      // 欲しい物アイテムの進捗率が正しく増える（5000 / 20000 * 100)
      await expect(page.getByText('25%')).toBeVisible();
      // もう１件送信
      await page.getByPlaceholder('我慢したものを入力').click();
      await page.getByPlaceholder('我慢したものを入力').fill('スタバ');
      await page.getByPlaceholder('節約できた額を入力').click();
      await page.getByPlaceholder('節約できた額を入力').fill('350');
      await page
        .getByRole('button', {
          name: '我慢できた！'
        })
        .click();
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('5350');
      await expect(page.getByText('27%')).toBeVisible();
      // ログページにログが作成される
      // ページ遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1');
      // テーブルの行数を取得
      const rowCount = await page.locator('table > tbody > tr').count();
      // １件目のログが最終行にあるか
      await expect(
        page.locator(
          `table > tbody > tr:nth-of-type(${rowCount}) > td:nth-of-type(1)`
        )
      ).toHaveText('飲み会');
      await expect(
        page.locator(
          `table > tbody > tr:nth-of-type(${rowCount}) > td:nth-of-type(2)`
        )
      ).toHaveText('5000');
      // ２件目のログが最終行の一つ上にあるか
      await expect(
        page.locator(
          `table > tbody > tr:nth-of-type(${rowCount - 1}) > td:nth-of-type(1)`
        )
      ).toHaveText('スタバ');
      await expect(
        page.locator(
          `table > tbody > tr:nth-of-type(${rowCount - 1}) > td:nth-of-type(2)`
        )
      ).toHaveText('350');
    });
    test('フォーム送信失敗時（タイトル＋金額→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/main');
      // 空のままフォームを送信
      await page
        .getByRole('button', {
          name: '我慢できた！'
        })
        .click();
      // 残高は0円のまま
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('0');
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1');
      // ログが作成されていない
      await expect(page.getByText('ログがありません。')).toBeVisible();
    });
    test('フォーム送信失敗時（タイトル→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/main');
      // 金額のみ入力
      await page.getByPlaceholder('節約できた額を入力').click();
      await page.getByPlaceholder('節約できた額を入力').fill('5000');
      await page
        .getByRole('button', {
          name: '我慢できた！'
        })
        .click();
      // 残高は0円のまま
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('0');
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1');
      // ログが作成されていない
      await expect(page.getByText('ログがありません。')).toBeVisible();
    });
    test('フォーム送信失敗時（金額→バリデーションエラー）', async () => {
      // ページ遷移
      await page.goto('http://localhost:3000/main');
      // タイトルのみ入力
      await page.getByPlaceholder('我慢したものを入力').click();
      await page.getByPlaceholder('我慢したものを入力').fill('飲み会');
      await page
        .getByRole('button', {
          name: '我慢できた！'
        })
        .click();
      // 残高は0円のまま
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('0');
      // ログページに遷移
      await page.goto('http://localhost:3000/logManagement/logTable/1');
      // ログが作成されていない
      await expect(page.getByText('ログがありません。')).toBeVisible();
    });
  });
  describe('欲しい物購入', () => {
    test('購入処理', async () => {
      // 残高に50000追加
      await prisma.balance.update({
        where: {
          userId: 'cm8d1l5cq0000u5ddbbrto25t'
        },
        data: { balance: 50000 }
      });
      // ページ遷移
      await page.goto('http://localhost:3000/main');
      // アイテム（Nintendo Switch）購入ボタンを押下
      await page.getByRole('button', { name: '購入' }).click();
      // 購入確認ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/main/purchaseWantedItem/testId'
      );
      // 購入ページにアイテム名（Nintendo Switch）の記載があるか
      await expect(
        page.getByRole('heading', {
          name: 'Nintendo Switch'
        })
      ).toBeVisible();
      // 購入しますか？の問いに「はい」を選択
      await page.getByRole('button', { name: 'はい' }).click();
      // 購入完了ページに遷移したか
      await expect(page).toHaveURL(
        'http://localhost:3000/main/purchaseWantedItem/postPurchase'
      );
      // ホームに戻るボタンを押下
      await page
        .getByRole('button', {
          name: 'ホームに戻る'
        })
        .click();
      // ホームに遷移したか
      await page.goto('http://localhost:3000/main');
      // 欲しい物リストにアイテムがないか
      await expect(page.getByText('Nintendo Switch')).not.toBeVisible();
      // 残高が元の50000から購入アイテム代20000を引いた、30000になっているか
      await expect(
        page.getByRole('heading', {
          name: 'balance'
        })
      ).toHaveText('30000');
    });
  });
});
