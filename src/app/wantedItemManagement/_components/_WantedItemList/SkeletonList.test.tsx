import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SkeletonList from './SkeletonList'

describe('SkeletonList Component', () => {
  test('renders the correct number of skeleton items', () => {
    render(<SkeletonList />)
    // article タグが 5 つレンダリングされていることを確認
    const skeletonItems = screen.getAllByRole('article')
    expect(skeletonItems).toHaveLength(5)
  })
})
