import { WantedItem } from '@prisma/client';
import { render, screen } from '@testing-library/react';

import Row from './Row';

describe('Row Component', () => {
  const mockWantedItem: WantedItem = {
    name: 'ワイドモニター',
    id: '1',
    userId: 'user1',
    price: 60000,
    url: 'https://example.com/monitor',
    createdAt: new Date()
  };

  it('商品名/値段/詳細リンクのレンダリング確認', () => {
    render(<Row item={mockWantedItem} />);
    expect(screen.getByText('ワイドモニター')).toBeInTheDocument();
    expect(screen.getByText('¥60,000')).toBeInTheDocument();
    const detailLink = screen.getByRole('link', {
      name: '詳細を見る'
    });
    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute('href', 'https://example.com/monitor');
  });

  it('URLがないアイテムは詳細リンクがレンダリングされないことを確認', () => {
    const wantedItemWithoutURL = { ...mockWantedItem, url: '' };
    render(<Row item={wantedItemWithoutURL} />);
    expect(
      screen.queryByRole('link', {
        name: '詳細を見る'
      })
    ).not.toBeInTheDocument();
  });

  it('編集/削除ボタンのレンダリング確認', () => {
    render(<Row item={mockWantedItem} />);
    const editButton = screen.getByRole('button', {
      name: `Edit ワイドモニター`
    });
    const deleteButton = screen.getByRole('button', {
      name: `Delete ワイドモニター`
    });

    expect(editButton).toBeInTheDocument();
    // 遷移先確認
    expect(
      screen.getByRole('link', {
        name: `Edit ワイドモニター`
      })
    ).toHaveAttribute('href', '/wantedItemManagement/edit/1');

    expect(deleteButton).toBeInTheDocument();
    // 遷移先確認
    expect(
      screen.getByRole('link', {
        name: `Delete ワイドモニター`
      })
    ).toHaveAttribute('href', '/wantedItemManagement/delete/1');
  });
});
