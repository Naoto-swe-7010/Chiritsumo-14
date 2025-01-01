import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading', () => {
  // ローティングUIがレンダリングされるか確認
  it('renders loading UI', () => {
    render(<Loading />)
    const loadingElement = screen.getByRole('loading')
    expect(loadingElement).toBeInTheDocument()
  })

  // ローディングUIにanimate-spinクラスが付与されているか確認
  it('loading UI with animate-spin class', () => {
    render(<Loading />)
    const spinnerElement = screen.getByRole('spinner')
    expect(spinnerElement).toHaveClass('animate-spin')
  })
})
