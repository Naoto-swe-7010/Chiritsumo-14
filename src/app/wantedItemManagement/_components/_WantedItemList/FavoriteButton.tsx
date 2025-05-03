'use client';

import React, { useOptimistic } from 'react';
import { WantedItem } from '@prisma/client';
import { FaStar } from 'react-icons/fa';

import { favoriteWantedItem } from '@/app/lib/action';

export const FavoriteButton = ({ item }: { item: WantedItem }) => {
  const [isOptimisticFavorite, setIsOptimisticFavorite] = useOptimistic(
    item.favorite,
    (currentState) => !currentState
  );

  return (
    <form
      action={async () => {
        setIsOptimisticFavorite(!item.favorite);
        await favoriteWantedItem(item.id);
      }}
    >
      <button
        type="submit"
        aria-label={item.favorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      >
        {isOptimisticFavorite ? (
          <FaStar className="text-xl text-yellow-400" />
        ) : (
          <FaStar className="text-xl text-gray-300" />
        )}
      </button>
    </form>
  );
};
