import React from 'react'

const CopyRight = () => {
  return (
    <section
      className="container mx-auto hidden text-center sm:block"
      aria-label="コピーライト">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ちりつも. All Rights Reserved.
      </p>
    </section>
  )
}

export default CopyRight
