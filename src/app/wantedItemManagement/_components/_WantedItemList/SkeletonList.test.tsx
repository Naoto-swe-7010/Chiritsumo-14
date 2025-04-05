import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { SkeletonList } from './SkeletonList';

describe('SkeletonList Component', () => {
  test('スケルトンUIのレンダリング確認', () => {
    render(<SkeletonList />);
    // articleタグが5つレンダリングされているか
    const skeletonItems = screen.getAllByRole('article');
    expect(skeletonItems).toHaveLength(5);
  });
});
