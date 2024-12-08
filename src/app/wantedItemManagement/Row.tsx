import { Button } from "@/components/ui/button";
import { WantedItem } from "@prisma/client";
import React from "react";

const Row = ({ item }: { item: WantedItem }) => {
  return (
    <article className="mb-4 flex items-center justify-between gap-4 rounded border border-gray-500 bg-gray-900 p-4 shadow-xl">
      <div className="w-full flex-1">
        <div>
          <div className="flex items-end gap-3">
            <h3 className="text-lg font-semibold text-gray-100">{item.name}</h3>
            <p className="text-sm text-gray-300 sm:text-base">
              Price: ¥{item.price}
            </p>
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              詳細を見る
            </a>
          )}
        </div>
      </div>
      <div>
        <div className="flex-col space-y-2">
          <div>
            <Button className="bg-pink-500 hover:bg-pink-700">✏️</Button>
          </div>
          <div>
            <Button className="bg-gray-300 hover:bg-gray-400">🗑️</Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Row;
