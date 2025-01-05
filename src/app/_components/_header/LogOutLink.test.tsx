import { render, screen } from '@testing-library/react'
import LogOutLink from './LogOutLink'

describe('LogOutLink', () => {
  it('ログアウトリンクのレンダリング確認 ', () => {
    render(<LogOutLink />)
    // アイコンが正しく表示されていることを確認
    const iconElement = screen.getByTestId('icon')
    expect(iconElement).toBeInTheDocument()

    // リンクが存在し、href属性が正しいことを確認
    const linkElement = screen.getByRole('link', {
      name: 'ログアウト',
    })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/api/auth/signout')
  })
})
