import { Balance, WantedItem } from '@prisma/client';
import { render, screen } from '@testing-library/react';

import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  const mockWantedItem: WantedItem = {
    name: 'Nintendo Switch',
    id: '1',
    userId: 'user1',
    price: 50000,
    url: 'https://example.com',
    createdAt: new Date()
  };

  const mockBalance: Balance = {
    id: '1',
    userId: 'user1',
    balance: 20000
  };

  it('プログレスバーのレンダリング確認', () => {
    render(<ProgressBar item={mockWantedItem} balance={mockBalance} />);
    // progress 要素が、max属性="1"、value属性が計算通り(20000 / 50000 = 0.4)でレンダリングされているか確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('max', '1');
    expect(progressBar).toHaveAttribute('value', '0.4');
  });

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

    // progressのvalue属性が計算通り(6000 / 5000 = 1.2）であることを確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('value', '1.2');

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

    // progressのvalue属性が "0" であることを確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('value', '0');

    // パーセンテージが0%であることを確認
    const percentageText = screen.getByText('0%');
    expect(percentageText).toBeInTheDocument();
  });
});
