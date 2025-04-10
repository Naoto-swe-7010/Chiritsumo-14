import React from 'react';
import { BsGraphUpArrow, BsStars } from 'react-icons/bs';
import { LuList } from 'react-icons/lu';
import { PiPiggyBank } from 'react-icons/pi';

const featuresData = [
  {
    icon: <PiPiggyBank className="h-6 w-6 text-white" />,
    title: '節約管理',
    description:
      '日々の節約を簡単に記録。今まで我慢した合計金額を一目で確認できます。'
  },

  {
    icon: <LuList className="h-6 w-6 text-white" />,
    title: '欲しい物リスト',
    description:
      '欲しい物を登録して、節約の目的を明確にします。「このアイテムを買うために節約を頑張る！」という思いが継続をサポートします。'
  },
  {
    icon: <BsGraphUpArrow className="h-6 w-6 text-white" />,
    title: '進捗管理',
    description:
      '欲しい物リストに登録したアイテムの値段に対して、我慢した合計金額がどれだけ貯まったかを確認できます。進捗が増えていく経過を見ることでモチベーションを維持します。'
  },
  {
    icon: <BsStars className="h-6 w-6 text-white" />,
    title: 'AIサポート',
    description:
      '節約のためのアドバイスをAIが提供します。節約の仕方がわからないときにはAIに聞いてみましょう。'
  }
];

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold underline decoration-slate-500 underline-offset-8 md:text-4xl">
          <span className="text-pink-400">ちりつも</span>
          <span className="text-white">の特徴</span>
        </h2>
        <div className="grid gap-8 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gray-900 p-8 transition-all duration-300 lg:hover:scale-110"
            >
              <div
                data-testid="feature-icon"
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500"
              >
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
