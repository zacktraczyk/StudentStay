'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicProfileError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex h-60 flex-col items-center gap-5 overflow-y-scroll md:h-full'>
      <h2 className='text-red-500'>Sorry could not find given profile</h2>
      <button type='button' onClick={reset}>
        Try again
      </button>
      <button type='button' onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  )
}
