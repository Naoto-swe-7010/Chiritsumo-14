import { render, screen } from '@testing-library/react'
import Title from './Title'

describe('Title', () => {
  it('タイトルのレンダリング確認', () => {
    render(<Title />)
    // アイコンが正しく表示されていることを確認
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toBeInTheDocument()

    // リンクが存在し、href属性が正しいことを確認
    const linkElement = screen.getByRole('link', {
      name: 'メインページに移動',
    })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/main')

    // テキスト「ちりつも」が正しく表示されていることを確認
    const titleText = screen.getByRole('heading', { name: 'ちりつも' })
    expect(titleText).toBeInTheDocument()
  })
})
