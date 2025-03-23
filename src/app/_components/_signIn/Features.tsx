import React from 'react';
import { BsGraphUpArrow } from 'react-icons/bs';
import { LuList } from 'react-icons/lu';
import { PiPiggyBank } from 'react-icons/pi';

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold underline decoration-slate-500 underline-offset-8 md:text-4xl">
          <span className="text-pink-400">ちりつも</span>
          <span className="text-white">の特徴</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-900 p-8">
            <div
              data-testid="feature-icon"
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500"
            >
              <PiPiggyBank className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">節約管理</h3>
            <p className="text-gray-300">
              日々の節約を簡単に記録。今まで我慢した合計金額を一目で確認できます。
            </p>
          </div>
          <div className="rounded-2xl bg-gray-900 p-8">
            <div
              data-testid="feature-icon"
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500"
            >
              <LuList className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">
              欲しい物リスト
            </h3>
            <p className="text-gray-300">
              欲しい物を登録して、節約の目的を明確にします。
              <br />
              「このアイテムを買うために節約を頑張る！」という思いが継続をサポートします。
            </p>
          </div>
          <div className="rounded-2xl bg-gray-900 p-8">
            <div
              data-testid="feature-icon"
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500"
            >
              <BsGraphUpArrow className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">進捗管理</h3>
            <p className="text-gray-300">
              欲しい物リストに登録したアイテムの値段に対して、我慢した合計金額がどれだけ貯まったかを確認できます。
              <br />
              進捗が増えていく経過を見ることでモチベーションを維持します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
