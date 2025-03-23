import { render, screen } from '@testing-library/react';

import Menu from './Menu';

describe('Menu', () => {
  it('ナビゲーションメニューのレンダリング確認', () => {
    render(<Menu />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  it('すべてのメニュー項目のレンダリング確認', () => {
    render(<Menu />);
    const homeLink = screen.getByRole('link', {
      name: /ホーム/i
    });
    const logLink = screen.getByRole('link', { name: /ログ/i });
    const wantedItemLink = screen.getByRole('link', {
      name: /欲しい物/i
    });

    expect(homeLink).toBeInTheDocument();
    expect(logLink).toBeInTheDocument();
    expect(wantedItemLink).toBeInTheDocument();
  });

  it('各リンクのhref属性の確認', () => {
    render(<Menu />);
    const homeLink = screen.getByRole('link', {
      name: /ホーム/i
    });
    const logLink = screen.getByRole('link', { name: /ログ/i });
    const wantedItemLink = screen.getByRole('link', {
      name: /欲しい物/i
    });

    expect(homeLink).toHaveAttribute('href', '/main');
    expect(logLink).toHaveAttribute('href', '/logManagement/logTable/1');
    expect(wantedItemLink).toHaveAttribute('href', '/wantedItemManagement');
  });

  it('アイコンのレンダリング確認', () => {
    render(<Menu />);

    const homeIcon = screen.getByTestId('icon-home');
    expect(homeIcon).toBeInTheDocument();

    const logIcon = screen.getByTestId('icon-log');
    expect(logIcon).toBeInTheDocument();

    const wantedItemIcon = screen.getByTestId('icon-wanted-item');
    expect(wantedItemIcon).toBeInTheDocument();
  });
});
