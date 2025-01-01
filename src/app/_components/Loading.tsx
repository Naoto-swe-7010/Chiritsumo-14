import React from 'react'

// SuspenseのFallbackUI
const Loading = () => {
  return (
    <div
      className="flex h-full items-center justify-center"
      role="loading">
      <div
        role="spinner"
        aria-label="スピナー"
        className="h-16 w-16 animate-spin rounded-full border-4 border-pink-500 border-t-transparent sm:h-20 sm:w-20"></div>
    </div>
  )
}

export default Loading
