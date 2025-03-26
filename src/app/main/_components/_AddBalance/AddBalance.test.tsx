import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { AddBalance } from './AddBalance';

// AddBalanceForm のモック化
vi.mock('./AddBalanceForm', () => ({
  AddBalanceForm: () => <div data-testid="add-balance-form" />
}));

describe('AddBalance Component', () => {
  it('タイトルのレンダリング確認', () => {
    render(<AddBalance />);
    const headerText = screen.getByText('無駄づかいを我慢できたら入力！');
    expect(headerText).toBeInTheDocument();
    expect(headerText.tagName).toBe('SPAN');
    expect(headerText.parentElement?.tagName).toBe('H1');
  });

  it('AddBalanceFormコンポーネントのレンダリング確認', () => {
    render(<AddBalance />);
    const formElement = screen.getByTestId('add-balance-form');
    expect(formElement).toBeInTheDocument();
  });
});
