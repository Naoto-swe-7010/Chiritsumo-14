import { redirect } from 'next/navigation'
import { getSession } from '../lib/commonFunction'

const page = async () => {
  // 認証チェック
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  redirect('/logManagement/logTable/1')
}

export default page
