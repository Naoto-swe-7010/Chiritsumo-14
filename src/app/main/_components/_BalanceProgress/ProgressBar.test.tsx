import { Balance, WantedItem } from '@prisma/client';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
  const mockWantedItem: WantedItem = {
    name: 'Nintendo Switch',
    id: '1',
    userId: 'user1',
    price: 50000,
    url: 'https://example.com',
    createdAt: new Date(),
    favorite: false,
    purchased: false
  };

  const mockBalance: Balance = {
    id: '1',
    userId: 'user1',
    balance: 20000
  };

  it('パーセンテージ表示が正しいか確認', () => {
    render(<ProgressBar item={mockWantedItem} balance={mockBalance} />);
    const percentageText = screen.getByText('40%');
    expect(percentageText).toBeInTheDocument();
  });

  it('欲しい物アイテムの値段より残高が多い時', () => {
    const mockHighBalance: Balance = {
      id: '1',
      balance: 60000,
      userId: 'user1'
    };
    render(<ProgressBar item={mockWantedItem} balance={mockHighBalance} />);

    // パーセンテージが "100%" であることを確認
    const percentageText = screen.getByText('100%');
    expect(percentageText).toBeInTheDocument();
  });

  it('残高が0円の時', () => {
    const mockZeroBalance: Balance = {
      id: '1',
      balance: 0,
      userId: 'user1'
    };

    render(<ProgressBar item={mockWantedItem} balance={mockZeroBalance} />);

    // パーセンテージが0%であることを確認
    const percentageText = screen.getByText('0%');
    expect(percentageText).toBeInTheDocument();
  });
});
