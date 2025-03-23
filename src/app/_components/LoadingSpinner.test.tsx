import { render, screen } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('ローディングスピナーUIのレンダリング確認', () => {
    render(<LoadingSpinner />);
    const spinnerElement = screen.getByRole('loading');
    expect(spinnerElement).toBeInTheDocument();
    // ローディングUIにanimate - spinクラスが付与されているか確認
    expect(spinnerElement).toHaveClass('animate-spin');
  });
});
