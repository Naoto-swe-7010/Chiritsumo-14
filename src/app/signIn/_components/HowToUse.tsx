import Image from 'next/image';

export const HowToUse = () => {
  const steps = [
    {
      title: '節約を入力',
      description: '無駄づかいを我慢できたタイミングですぐに記録しましょう。',
      image: '/lp_img1.webp'
    },
    {
      title: '欲しい物を登録',
      description: 'あなたが今欲しい物を登録し、節約の目的にしましょう。',
      image: '/lp_img2.webp'
    },
    {
      title: '進捗を確認',
      description:
        '欲しい物の値段に対する節約の進捗を確認し、モチベーションを維持しましょう。',
      image: '/lp_img3.webp'
    },
    {
      title: 'AIのサポートを受ける',
      description:
        '送信したキーワードに関連する節約アドバイスをAIが提供します。節約が捗らないときはAIに頼ってみましょう。',
      image: '/lp_img4.webp'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-20 text-center text-3xl font-bold md:text-5xl">
          <span className="text-cyan-500">ちりつも</span>
          <span className="text-gray-700">の使い方</span>
        </h2>
        <div className="space-y-32 md:space-y-20">
          {/* 使い方のステップ */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-8 md:flex-row md:gap-16"
            >
              {/* ステップの内容 */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="mx-auto max-w-xl">
                  <h3 className="mb-6 text-2xl font-bold text-gray-700 md:text-4xl">
                    Step {index + 1}：{step.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 md:text-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* ステップの画像 */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative mx-auto aspect-[3/5] w-full max-w-[300px] transform transition-transform duration-500 lg:hover:scale-125">
                  <Image
                    src={step.image || ''}
                    alt={`${step.title}の画面`}
                    width="300"
                    height="500"
                    className="rounded-2xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
