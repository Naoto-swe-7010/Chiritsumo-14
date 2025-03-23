import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import AddBalance from './AddBalance';

// AddBalanceForm のモック化
vi.mock('./AddBalanceForm', () => ({
  default: () => <div data-testid="add-balance-form" />
}));

describe('AddBalance Component', () => {
  it('タイトルのレンダリング確認', () => {
    render(<AddBalance />);
    const headingElement = screen.getByRole('heading');
    const titleLine1 = screen.getByText('無駄づかいを我慢して');
    const titleLine2 = screen.getByText('欲しい物を手に入れよう！');
    expect(headingElement).toBeInTheDocument();
    expect(titleLine1).toBeInTheDocument();
    expect(titleLine2).toBeInTheDocument();
  });

  it('AddBalanceFormコンポーネントのレンダリング確認', () => {
    render(<AddBalance />);
    const formElement = screen.getByTestId('add-balance-form');
    expect(formElement).toBeInTheDocument();
  });
});
