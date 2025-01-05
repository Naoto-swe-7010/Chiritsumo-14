import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccountInfo from './AccountInfo'
import { Session } from 'next-auth'

const mockSession: Session = {
  user: {
    name: 'Test User',
    image: 'https://example.com/profile.jpg',
  },
  expires: 'fake-expiry-date',
}

describe('AccountInfo', () => {
  it('プロフィール画像が存在する場合のレンダリング確認', () => {
    render(<AccountInfo session={mockSession} />)
    const userImage = screen.getByRole('img')
    expect(userImage).toBeInTheDocument()
    expect(userImage).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fprofile.jpg&w=64&q=75',
    )
  })

  it('プロフィール画像が存在しない場合のレンダリング確認(表示されないことを確認)', () => {
    const mockSessionWithoutImage = {
      ...mockSession,
      user: {
        ...mockSession.user,
        image: null,
      },
    }
    render(<AccountInfo session={mockSessionWithoutImage} />)
    const userImage = screen.queryByRole('img')
    expect(userImage).toBeNull()
  })

  it('ユーザ名のレンダリング確認', () => {
    render(<AccountInfo session={mockSession} />)
    const userName = screen.getByText('Test User')
    expect(userName).toBeInTheDocument()
  })
})
