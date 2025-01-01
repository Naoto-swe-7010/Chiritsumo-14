import React from 'react'
import { prisma } from '../../../../../prisma'
import DeleteLogForm from '../_components/DeleteLogForm'
import Modal from '@/app/_components/Modal'
import { getSession } from '@/app/lib/commonFunction'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { id: string } }) => {
  // 認証チェック
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  const { id } = params

  // 削除対象のログを取得
  let log = null
  try {
    log = await prisma.log.findUnique({
      where: {
        id: id,
      },
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <Modal>
      <h2 className="mb-4 text-lg font-bold">削除</h2>
      <DeleteLogForm log={log!} />
    </Modal>
  )
}

export default page
