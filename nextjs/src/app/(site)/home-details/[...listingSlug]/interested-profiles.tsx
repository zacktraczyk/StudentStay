import Tooltip from '@mui/material/Tooltip'
import { useSupabase } from '@/app/supabase-provider'
import React from 'react'

interface InterestedProfilesProps {
  listing_id: number
}

export default async function InterestedProfiles({ listing_id }: InterestedProfilesProps) {
  const { supabase, session } = useSupabase()

  const { data: profiles, error } = await supabase.rpc('listing_favorited_by', {
    current_profile_id: session?.user.id || undefined,
    selected_listing_id: Number(listing_id),
  })

  if (error) {
    console.error(error)
  }

  return (
    <div className='mt-6'>
      <h3 className='py-3 text-lg font-semibold'>Potential Roomates 👀 ✨</h3>
      {profiles && profiles.length > 0 ? (
        <div className='flex w-full flex-wrap gap-3'>
          {profiles.map((profile) => (
            <Tooltip title={profile.full_name || 'MISSING NAME'} key={profile.profile_id} arrow>
              <img
                className='relative h-20 w-20 cursor-pointer rounded-full bg-gray-50 object-cover shadow-md hover:shadow-lg'
                src={
                  profile.avatar_url ||
                  'https://www.reso.org/wp-content/uploads/2020/03/No-Photo-Available-591x591-2.jpg'
                }
                alt={profile.full_name}
              />
            </Tooltip>
          ))}
        </div>
      ) : (
        <div className='text-base italic text-gray-500'>No one is interested yet...</div>
      )}
    </div>
  )
}
