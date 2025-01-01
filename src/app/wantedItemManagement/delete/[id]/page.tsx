import React from 'react'

import { prisma } from '../../../../../prisma'
import DeleteWantedItemForm from '../_components/DeleteWantedItemForm'
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

  // 削除対象のアイテムを取得
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
      <h2 className="mb-4 text-lg font-bold">削除</h2>
      <DeleteWantedItemForm item={item!} />
    </Modal>
  )
}

export default page
