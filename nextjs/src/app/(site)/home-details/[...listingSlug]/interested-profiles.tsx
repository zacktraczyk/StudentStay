import Tooltip from '@mui/material/Tooltip'
import { useSupabase } from '@/app/supabase-provider'
import React, { useEffect } from 'react'
import { Database } from '@/lib/database.types'
import Link from 'next/link'

interface InterestedProfilesProps {
  listing_id: number
}

type lfb_return = Database['public']['Functions']['listing_favorited_by']['Returns']

export default function InterestedProfiles({ listing_id }: InterestedProfilesProps) {
  const { supabase, session } = useSupabase()

  const [profiles, setProfiles] = React.useState<lfb_return>([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data: _profiles, error } = await supabase.rpc('listing_favorited_by', {
        current_profile_id: session?.user.id || undefined,
        selected_listing_id: Number(listing_id),
      })

      if (error) {
        console.error(error)
        return
      }

      setProfiles(_profiles || [])
    }

    fetchProfiles()
  }, [listing_id, session?.user.id, supabase])

  return (
    <div className='mt-6'>
      <h3 className='py-3 text-lg font-semibold'>Potential Roomates 👀 ✨</h3>
      {profiles && profiles.length > 0 ? (
        <div className='flex w-full flex-wrap gap-3'>
          {profiles.map((profile) => (
            <Tooltip title={profile.full_name || 'MISSING NAME'} key={profile.profile_id} arrow>
              <Link href={`/u/${profile.profile_id}`}>
                <img
                  className='relative h-20 w-20 cursor-pointer rounded-full bg-gray-50 object-cover shadow-md hover:shadow-lg'
                  src={
                    profile.avatar_url ||
                    'https://www.reso.org/wp-content/uploads/2020/03/No-Photo-Available-591x591-2.jpg'
                  }
                  alt={profile.full_name}
                />
              </Link>
            </Tooltip>
          ))}
        </div>
      ) : (
        <div className='text-base italic text-gray-500'>No one is interested yet...</div>
      )}
    </div>
  )
}
