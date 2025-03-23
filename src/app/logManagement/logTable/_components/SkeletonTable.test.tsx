import { render, screen } from '@testing-library/react';

import { SkeletonTable } from './SkeletonTable';

describe('SkeletonTable Component', () => {
  it('テーブルヘッダーとスケルトン15行が正しくレンダリングされるかを確認', () => {
    render(<SkeletonTable />);

    // テーブルヘッダーの確認
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(4); // "タイトル", "値段", "日時", "アクション"

    // スケルトン行の確認
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(16); // 1行目はヘッダー、残り15行がスケルトン行
  });
});
