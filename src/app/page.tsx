import { redirect } from 'next/navigation'

import SignIn from './SignIn'
import { getSession } from './lib/commonFunction'

export default async function Home() {
  const session = await getSession()
  // 認証チェック
  if (session) {
    redirect('/main')
  }
  return <SignIn />
}
