import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading spinner UI', () => {
    render(<LoadingSpinner />)
    // ローティングスピナーUIがレンダリングされるか確認
    const spinnerElement = screen.getByRole('loading')
    expect(spinnerElement).toBeInTheDocument()
    // ローディングスピナーUIにanimate-spinクラスが付与されているか確認
    expect(spinnerElement).toHaveClass('animate-spin')
  })
})
