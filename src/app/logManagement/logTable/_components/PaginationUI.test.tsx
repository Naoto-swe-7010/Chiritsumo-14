import { render, screen } from '@testing-library/react';

import PaginationUI from './PaginationUI';

describe('PaginationUI Component', () => {
  it('リンクの数がtotalPage＋2（前ページ＋次ページ）になることを確認', () => {
    render(<PaginationUI totalPages={5} page="3" />);
    const linkElement = screen.getAllByRole('link');
    expect(linkElement).toHaveLength(7); // 5ページ + Back + Next
  });
  it('現在のページが1のときは、リンクの数がtotalPage＋1（次ページ）になることを確認', () => {
    render(<PaginationUI totalPages={5} page="1" />);
    const linkElement = screen.getAllByRole('link');
    expect(linkElement).toHaveLength(6); // 5ページ + Next

    // Backボタンが無効化されているか確認
    const backButton = screen.getByText('< Back');
    expect(backButton).toHaveClass('opacity-50');
    expect(backButton).toHaveClass('pointer-events-none');
  });

  it('現在のページ=totalPageのときは、リンクの数がtotalPage＋1（前ページ）になることを確認', () => {
    render(<PaginationUI totalPages={5} page="5" />);
    const linkElement = screen.getAllByRole('link');
    expect(linkElement).toHaveLength(6); // 5ページ + Back

    // Nextボタンが無効化されているか確認
    const nextButton = screen.getByText('Next >');
    expect(nextButton).toHaveClass('opacity-50');
    expect(nextButton).toHaveClass('pointer-events-none');
  });

  it('totalPage=1のときは、リンクの数が1になることを確認', () => {
    render(<PaginationUI totalPages={1} page="1" />);
    const linkElement = screen.getAllByRole('link');
    expect(linkElement).toHaveLength(1); // 1ページ
  });

  it('現在のページのリンクが強調表示されていることを確認', () => {
    render(<PaginationUI totalPages={5} page="3" />);
    const activePageElement = screen.getByText('3');
    expect(activePageElement).toHaveClass('bg-pink-500'); // 現在のページはピンク背景
    expect(activePageElement).toHaveClass('text-white'); // 現在のページは白文字
  });

  it('現在のページのリンク以外は強調表示されていないことを確認', () => {
    render(<PaginationUI totalPages={5} page="3" />);
    const activePageElement = screen.getByText('2');
    expect(activePageElement).not.toHaveClass('bg-pink-500'); // 現在のページ以外はピンク背景になっていない
    expect(activePageElement).not.toHaveClass('text-white'); // 現在のページ以外は白文字になっていない
  });

  it('各ページのリンク遷移先を確認', () => {
    render(<PaginationUI totalPages={5} page="3" />);

    // 各リンクのhref属性を確認
    const link1 = screen.getByText('1');
    expect(link1).toHaveAttribute('href', '/logManagement/logTable/1');

    const link3 = screen.getByText('3');
    expect(link3).toHaveAttribute('href', '/logManagement/logTable/3');

    const link5 = screen.getByText('5');
    expect(link5).toHaveAttribute('href', '/logManagement/logTable/5');
  });

  it('BackボタンとNextボタンのリンク遷移先を確認', () => {
    render(<PaginationUI totalPages={5} page="3" />);

    // Backボタンのhrefを確認
    const backButton = screen.getByText('< Back');
    expect(backButton).toHaveAttribute('href', '/logManagement/logTable/2');

    // Nextボタンのhrefを確認
    const nextButton = screen.getByText('Next >');
    expect(nextButton).toHaveAttribute('href', '/logManagement/logTable/4');
  });
});
