'use client'

import { useSupabase } from '@/app/supabase-provider'
import { HeartIcon as HeartIconOutline, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'
import CreateAccountModal from './create-account-modal'

interface FavoriteButtonProps {
  initial_favorite: boolean
  listing_id: number
}

export default function FavoriteButton({ initial_favorite, listing_id }: FavoriteButtonProps) {
  const { supabase, session } = useSupabase()
  const [favorited, setFavorited] = useState(initial_favorite)
  const [openModal, setOpenModal] = useState(false)

  const handleFavorite = async () => {
    if (!session) {
      setOpenModal(true)
      return
    }

    const { error } = await supabase
      .from('profile_listing_interests')
      .upsert({ profile_id: session!.user.id, listing_id, active: !favorited })
      .single()

    if (error) {
      console.error(error)
    }

    if (!error) {
      setFavorited(!favorited)
    }
  }

  return (
    <>
      <CreateAccountModal open={openModal} setOpen={setOpenModal} />

      <button
        type='button'
        className={`ml-4 flex items-center justify-center rounded-md px-3 py-3 ${
          favorited ? 'text-rose-400 hover:text-rose-500' : 'text-gray-400 hover:text-gray-500'
        } hover:bg-gray-100 `}
        onClick={handleFavorite}
      >
        {favorited ? (
          <HeartIconSolid className='h-6 w-6 flex-shrink-0' aria-hidden='true' />
        ) : (
          <HeartIconOutline className='h-6 w-6 flex-shrink-0' aria-hidden='true' />
        )}
        <span className='sr-only'>Add to favorites</span>
      </button>
    </>
  )
}
