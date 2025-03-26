import { render, screen } from '@testing-library/react';

import { AddWantedItem } from './AddWantedItem';

// AddWantedItemFormコンポーネントのモック化
vi.mock('./AddWantedItemForm', () => ({
  AddWantedItemForm: () => <div data-testid="add-wanted-item-form" />
}));

describe('AddWantedItem', () => {
  it('タイトルのレンダリング確認', () => {
    render(<AddWantedItem />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('欲しい物');
  });
  it('AddWantedItemFormコンポーネントのレンダリング確認', () => {
    render(<AddWantedItem />);
    const formElement = screen.getByTestId('add-wanted-item-form');
    expect(formElement).toBeInTheDocument();
  });
});
