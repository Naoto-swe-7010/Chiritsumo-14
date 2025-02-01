import Image from 'next/image'

const HowToUse = () => {
  const steps = [
    {
      title: '節約を入力',
      description:
        '無駄遣いを我慢できたタイミングですぐに記録しましょう。',
      image: '/lp_img1.jpg',
    },
    {
      title: '欲しい物を登録',
      description: 'あなたが今欲しい物を登録し、節約の目的にしましょう。',
      image: '/lp_img2.jpg',
    },
    {
      title: '進捗を確認',
      description:
        '欲しい物の値段に対する節約の進捗を確認し、モチベーションを維持しましょう。',
      image: '/lp_img3.jpg',
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 underline underline-offset-8 decoration-slate-500">
          <span className="text-pink-400">ちりつも</span>
          <span className="text-white">の使い方</span>
        </h2>
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Step content */}
              <div
                className={`flex-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="max-w-xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Step {index + 1}：{step.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Step image */}
              <div
                className={`flex-1 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative aspect-[3/5] w-full max-w-[300px] mx-auto">
                  <Image
                    src={step.image || ''}
                    alt={`${step.title}の画面`}
                    width="300"
                    height="500"
                    className="object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToUse
