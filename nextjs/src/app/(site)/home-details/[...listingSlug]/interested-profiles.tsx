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
    <div>
      <h1 className='py-3 text-2xl'>Users who also like this listing</h1>
      {profiles && profiles.length > 0 ? (
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {profiles.map((profile) => (
            <div key={profile.profile_id}>
              <img
                className='relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-4 bg-white object-cover text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                src={
                  profile.avatar_url ||
                  'https://www.reso.org/wp-content/uploads/2020/03/No-Photo-Available-591x591-2.jpg'
                }
                alt={profile.full_name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No profiles favorited</div>
      )}
    </div>
  )
}
