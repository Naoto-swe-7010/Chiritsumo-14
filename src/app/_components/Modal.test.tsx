import { render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('Modal', () => {
  it('ModalとChildrenのレンダリング確認', () => {
    render(
      <Modal>
        <div>Test</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const children = screen.getByText('Test');
    expect(children).toBeInTheDocument();
  });
});
