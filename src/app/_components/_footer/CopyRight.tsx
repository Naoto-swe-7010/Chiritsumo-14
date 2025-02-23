import React from 'react'

const CopyRight = () => {
  return (
    <section
      className="container mx-auto text-center hidden sm:block"
      aria-label="コピーライト">
      <small className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ちりつも. All Rights Reserved.
      </small>
    </section>
  )
}

export default CopyRight
