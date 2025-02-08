import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowToUse from './HowToUse'

describe('HowToUse', () => {
  it('タイトルが正しく表示される', () => {
    render(<HowToUse />)
    expect(screen.getByText('ちりつも')).toBeInTheDocument()
    expect(screen.getByText('の使い方')).toBeInTheDocument()
  })

  it('全てのステップが正しく表示される', () => {
    render(<HowToUse />)

    // Step 1の検証
    expect(screen.getByText('Step 1：節約を入力')).toBeInTheDocument()
    expect(
      screen.getByText(
        '無駄づかいを我慢できたタイミングですぐに記録しましょう。',
      ),
    ).toBeInTheDocument()

    // Step 2の検証
    expect(screen.getByText('Step 2：欲しい物を登録')).toBeInTheDocument()
    expect(
      screen.getByText(
        'あなたが今欲しい物を登録し、節約の目的にしましょう。',
      ),
    ).toBeInTheDocument()

    // Step 3の検証
    expect(screen.getByText('Step 3：進捗を確認')).toBeInTheDocument()
    expect(
      screen.getByText(
        '欲しい物の値段に対する節約の進捗を確認し、モチベーションを維持しましょう。',
      ),
    ).toBeInTheDocument()
  })

  it('全ての画像が正しく表示される', () => {
    render(<HowToUse />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)

    expect(images[0]).toHaveAttribute('src')
    expect(images[0]).toHaveAttribute('alt', '節約を入力の画面')

    expect(images[1]).toHaveAttribute('src')
    expect(images[1]).toHaveAttribute('alt', '欲しい物を登録の画面')

    expect(images[2]).toHaveAttribute('src')
    expect(images[2]).toHaveAttribute('alt', '進捗を確認の画面')
  })
})
