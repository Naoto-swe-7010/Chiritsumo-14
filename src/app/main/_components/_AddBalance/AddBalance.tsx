import React from 'react'
import AddBalanceForm from './AddBalanceForm'

const AddBalance = () => {
  return (
    <section className="flex justify-center p-4 text-gray-300 sm:p-6">
      <div className="w-full max-w-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-gray-100 sm:text-2xl">
          <span className="block">無駄づかいを我慢できたら入力</span>
        </h1>
        <AddBalanceForm />
      </div>
    </section>
  )
}

export default AddBalance
