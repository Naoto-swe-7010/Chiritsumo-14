import React from 'react'
import Image from 'next/image'
import { Session } from 'next-auth'

import LogOutLink from './LogOutLink'

const AccountInfo = ({ session }: { session: Session }) => {
  return (
    <section
      className="flex items-center gap-4"
      aria-label="アカウント情報">
      {session.user!.image ?
        // Googleアカウントの画像を表示
        <Image
          src={session.user!.image}
          alt={'プロフィール画像'}
          width={32}
          height={32}
          className="rounded-full"
        />
      : null}
      {/* Googleアカウントの名前を表示 */}
      <p className="hidden font-medium sm:block" aria-label="ユーザー名">
        {session.user!.name}
      </p>
      <LogOutLink />
    </section>
  )
}

export default AccountInfo
