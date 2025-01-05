import { render, screen } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('ModalとChildrenのレンダリング確認', () => {
    render(<Modal children={<div>Test</div>} />)

    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    const children = screen.getByText('Test')
    expect(children).toBeInTheDocument()
  })
})
