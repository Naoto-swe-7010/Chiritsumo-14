import { cache } from 'react';

import { auth } from '../../../auth';
import { prisma } from '../../../prisma';

// 日付フォーマット関数
export const formattedDate = (date: Date): string => {
  return date
    .toLocaleString('ja-JP', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo'
    })
    .replace(/^20/, '');
};

// データ取得（全てユーザに紐づくデータ取得のためDynamic Rendering）///////////////////////////////////

// Sessionの取得
export const getSession = () => {
  return auth();
};

// UserIDの取得
export const getSessionAndUserId = cache(async () => {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('セッション情報が取得できませんでした。');
    }
    return session.user.id;
  } catch {
    throw new Error('認証が必要です。');
  }
});

// Balanceレコードの取得(存在しない場合は新規作成)
export const getBalance = cache(async (userId: string) => {
  let balance = await prisma.balance.findUnique({
    where: { userId }
  });
  balance ??= await prisma.balance.create({
    data: {
      userId,
      balance: 0
    }
  });
  return balance;
});

// ログの取得（ページネーションごと）
export const getLog = cache(
  async (userId: string, pageNumber: number, pageSize: number) => {
    return prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    });
  }
);

// ログの取得（全件）
export const getAllLog = cache(async (userId: string) => {
  return prisma.log.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
});

// 欲しい物リストの取得
export const getWantedItemList = cache(async (userId: string) => {
  return prisma.wantedItem.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
});

// 欲しいものリストの取得（未購入）
export const getWantedItemListWithoutPurchased = cache(
  async (userId: string) => {
    return prisma.wantedItem.findMany({
      where: { userId, purchased: false },
      orderBy: { createdAt: 'desc' }
    });
  }
);

// 欲しいものリストの取得（未購入かつお気に入り）
export const getFavoriteWantedItemListWithoutPurchased = cache(
  async (userId: string) => {
    return prisma.wantedItem.findMany({
      where: { userId, purchased: false, favorite: true },
      orderBy: { createdAt: 'desc' }
    });
  }
);

// 購入済みリストの取得（購入済み）
export const getPurchasedItemList = cache(async (userId: string) => {
  return prisma.wantedItem.findMany({
    where: { userId, purchased: true },
    orderBy: { createdAt: 'desc' }
  });
});

// preload///////////////////////////////////

// mainページ
export const preloadForMainPage = async (userId: string) => {
  await Promise.all([
    getBalance(userId),
    getFavoriteWantedItemListWithoutPurchased(userId)
  ]);
};

// wantedItemManagementページ
export const preloadForWantedItemManagementPage = async (userId: string) => {
  await Promise.all([
    getBalance(userId),
    getWantedItemListWithoutPurchased(userId),
    getPurchasedItemList(userId)
  ]);
};
