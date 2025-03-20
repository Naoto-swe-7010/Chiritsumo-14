import React from 'react'
import { PiPiggyBank } from 'react-icons/pi'
import { LuList } from 'react-icons/lu'
import { BsGraphUpArrow } from 'react-icons/bs'

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 underline underline-offset-8 decoration-slate-500">
          <span className="text-pink-400">ちりつも</span>
          <span className="text-white">の特徴</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-2xl">
            <div
              data-testid="feature-icon"
              className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-6">
              <PiPiggyBank className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">節約管理</h3>
            <p className="text-gray-300">
              日々の節約を簡単に記録。今まで我慢した合計金額を一目で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl">
            <div
              data-testid="feature-icon"
              className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-6">
              <LuList className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              欲しい物リスト
            </h3>
            <p className="text-gray-300">
              欲しい物を登録して、節約の目的を明確にします。
              <br />
              「このアイテムを買うために節約を頑張る！」という思いが継続をサポートします。
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl">
            <div
              data-testid="feature-icon"
              className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-6">
              <BsGraphUpArrow className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">進捗管理</h3>
            <p className="text-gray-300">
              欲しい物リストに登録したアイテムの値段に対して、我慢した合計金額がどれだけ貯まったかを確認できます。
              <br />
              進捗が増えていく経過を見ることでモチベーションを維持します。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
