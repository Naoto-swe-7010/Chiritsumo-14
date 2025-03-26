import { render, screen } from '@testing-library/react';

import { Loading } from './Loading';

describe('Loading', () => {
  it('ローティングUIのレンダリング確認', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('loading');
    expect(loadingElement).toBeInTheDocument();
    // ローディングUIにanimate - spinクラスが付与されているか確認
    const spinnerElement = screen.getByRole('spinner');
    expect(spinnerElement).toHaveClass('animate-spin');
  });
});
