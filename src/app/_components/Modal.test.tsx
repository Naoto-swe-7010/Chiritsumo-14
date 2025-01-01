import { render, screen } from '@testing-library/react'
import Modal from './Modal'

// ModalとChildrenがレンダリングされることを確認
describe('Modal', () => {
  it('renders modal and children', () => {
    render(<Modal children={<div>Test</div>} />)
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    const children = screen.getByText('Test')
    expect(children).toBeInTheDocument()
  })
})
