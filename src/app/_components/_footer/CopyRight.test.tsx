import { render, screen } from '@testing-library/react'
import CopyRight from './CopyRight'

describe('CopyRight Component', () => {
  it('コピーライトが正しい年でレンダリングされているか確認', () => {
    render(<CopyRight />)
    const footerElement = screen.getByRole('region', {
      name: 'コピーライト',
    })
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveTextContent(
      `© ${new Date().getFullYear()} ちりつも. All Rights Reserved.`,
    )
  })
})
