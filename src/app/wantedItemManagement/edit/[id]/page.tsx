import React from 'react'

import { prisma } from '../../../../../prisma'
import EditWantedItemForm from '../_components/EditWantedItemForm'
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

  // 編集対象のアイテムを取得
  let item = null
  try {
    item = await prisma.wantedItem.findUnique({
      where: {
        id: id,
      },
    })
  } catch (e) {
    console.error(e)
  }
  return (
    <Modal>
      <h2 className="mb-4 text-lg font-bold">編集</h2>
      <EditWantedItemForm item={item!} />
    </Modal>
  )
}

export default page
