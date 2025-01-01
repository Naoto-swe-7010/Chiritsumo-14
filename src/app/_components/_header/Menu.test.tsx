import { render, screen } from '@testing-library/react'
import Menu from './Menu'

describe('Menu', () => {
  // ナビゲーションメニューのレンダリング確認
  it('renders the menu', () => {
    render(<Menu />)
    const navElement = screen.getByRole('navigation')
    expect(navElement).toBeInTheDocument()
  })

  // すべてのメニュー項目のレンダリング確認
  it('renders all menu items', () => {
    render(<Menu />)
    const homeLink = screen.getByRole('link', { name: /ホーム/i })
    const logLink = screen.getByRole('link', { name: /ログ/i })
    const wantedItemLink = screen.getByRole('link', { name: /欲しい物/i })

    expect(homeLink).toBeInTheDocument()
    expect(logLink).toBeInTheDocument()
    expect(wantedItemLink).toBeInTheDocument()
  })

  // 各リンクのhref属性の確認
  it('has correct href attributes', () => {
    render(<Menu />)
    const homeLink = screen.getByRole('link', { name: /ホーム/i })
    const logLink = screen.getByRole('link', { name: /ログ/i })
    const wantedItemLink = screen.getByRole('link', { name: /欲しい物/i })

    expect(homeLink).toHaveAttribute('href', '/main')
    expect(logLink).toHaveAttribute('href', '/logManagement/logTable/1')
    expect(wantedItemLink).toHaveAttribute('href', '/wantedItemManagement')
  })

  //   アイコンのレンダリング確認
  it('renders all icons', () => {
    render(<Menu />)

    const homeIcon = screen.getByTestId('icon-home')
    expect(homeIcon).toBeInTheDocument()

    const logIcon = screen.getByTestId('icon-log')
    expect(logIcon).toBeInTheDocument()

    const wantedItemIcon = screen.getByTestId('icon-wanted-item')
    expect(wantedItemIcon).toBeInTheDocument()
  })
})
