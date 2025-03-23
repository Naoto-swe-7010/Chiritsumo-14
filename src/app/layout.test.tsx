import { render, screen } from '@testing-library/react';

import RootLayout, { metadata } from './layout';

// ヘッダーとフッターをモック
vi.mock('./_components/_header/Header', () => ({
  default: () => <header data-testid="header">Mock Header</header>
}));
vi.mock('./_components/_footer/Footer', () => ({
  default: () => <footer data-testid="footer">Mock Footer</footer>
}));

describe('RootLayout Component', () => {
  it('Header, Footer, Childrenのレンダリング確認', () => {
    render(
      <RootLayout>
        <div data-testid="child">Test Content</div>
      </RootLayout>
    );
    // ヘッダーの存在確認
    expect(screen.getByTestId('header')).toBeInTheDocument();
    // 子要素のレンダリング確認
    expect(screen.getByTestId('child')).toBeInTheDocument();
    // フッターの存在確認
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('メタデータの確認', () => {
    expect(metadata.title).toBe('ちりつも');
    expect(metadata.description).toBe(
      '無駄な消費を我慢して欲しい物を手に入れよう！'
    );
    expect(metadata.openGraph).toEqual({
      type: 'website',
      locale: 'ja_JP',
      url: 'https://chiritsumo-14.vercel.app',
      siteName: 'ちりつも',
      title: 'ちりつも',
      description: '無駄な消費を我慢して欲しい物を手に入れよう！',
      images: [
        {
          url: 'https://chiritsumo-14.vercel.app/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'ちりつも'
        }
      ]
    });
    expect(metadata.icons).toEqual({
      icon: '/favicon.ico',
      apple: '/apple-icon.ico',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon.ico'
      }
    });
    expect(metadata.appleWebApp).toBe(true);
  });
});
