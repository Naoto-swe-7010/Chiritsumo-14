import { render, screen } from '@testing-library/react'

import Menu from './Menu'

describe('Menu', () => {
  // ナビゲーションメニューのレンダリング確認
  it('renders the menu', () => {
    render(<Menu />)
    const navElement = screen.getByRole('navigation')
    expect(navElement).toBeInTheDocument()
  })

  // ナビゲーションメニューの全メニューアイテムのレンダリング確認
  it('renders all menu items', () => {
    render(<Menu />)
    const homeLink = screen.getByRole('link', { name: /ホーム/i })
    const logLink = screen.getByRole('link', { name: /ログ/i })
    const wantedItemLink = screen.getByRole('link', { name: /欲しい物/i })
    expect(homeLink).toBeInTheDocument()
    expect(logLink).toBeInTheDocument()
    expect(wantedItemLink).toBeInTheDocument()
  })

  // ナビゲーションメニューの全メニューアイテムのhref属性確認
  it('has correct href attributes', () => {
    render(<Menu />)
    const homeLink = screen.getByRole('link', { name: /ホーム/i })
    const logLink = screen.getByRole('link', { name: /ログ/i })
    const wantedItemLink = screen.getByRole('link', { name: /欲しい物/i })

    expect(homeLink).toHaveAttribute('href', '/main')
    expect(logLink).toHaveAttribute('href', '/logManagement/logTable/1')
    expect(wantedItemLink).toHaveAttribute('href', '/wantedItemManagement')
  })
})
