import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Features from './Features'

describe('Features', () => {
  it('タイトルが正しく表示される', () => {
    render(<Features />)
    expect(screen.getByText('ちりつも')).toBeInTheDocument()
    expect(screen.getByText('の特徴')).toBeInTheDocument()
  })

  it('全ての機能カードが正しく表示される', () => {
    render(<Features />)

    // 節約管理の検証
    expect(screen.getByText('節約管理')).toBeInTheDocument()
    expect(
      screen.getByText(
        '日々の節約を簡単に記録。今まで我慢した合計金額を一目で確認できます。',
      ),
    ).toBeInTheDocument()

    // 欲しい物リストの検証
    expect(screen.getByText('欲しい物リスト')).toBeInTheDocument()
    expect(
      screen.getByText(
        '欲しい物を登録して、節約の目的を明確にします。「このアイテムを買うために節約を頑張る！」という思いが継続をサポートします。',
      ),
    ).toBeInTheDocument()

    // 進捗管理の検証
    expect(screen.getByText('進捗管理')).toBeInTheDocument()
    expect(
      screen.getByText(
        '欲しい物リストに登録したアイテムの値段に対して、我慢した合計金額がどれだけ貯まったかを確認できます。進捗が増えていく経過を見ることでモチベーションを維持します。',
      ),
    ).toBeInTheDocument()
  })

  it('全てのアイコンが正しく表示される', () => {
    render(<Features />)

    // アイコンを含むdiv要素が3つ存在することを確認
    const iconContainers = screen.getAllByTestId('feature-icon')
    expect(iconContainers).toHaveLength(3)
  })
})
