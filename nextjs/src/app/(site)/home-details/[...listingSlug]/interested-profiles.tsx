import Image from 'next/image'
import React from 'react'

type Profile = { profile_id: string; avatar_url: string; full_name: string }

interface InterestedProfilesProps {
  profiles: Profile[] | null
}

export default function InterestedProfiles({ profiles }: InterestedProfilesProps) {
  return (
    <div>
      <h1 className='text-2xl'>Users who also like this listing:</h1>
      {profiles ? (
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {profiles.map((profile) => (
            <div key={profile.profile_id}>
              <p></p>
              <img
                className='relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white object-cover text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                src={profile.avatar_url}
                alt={profile.full_name}
              />
              {/* <div>{profile.full_name}</div> */}
            </div>
          ))}
        </div>
      ) : (
        <div>No profiles favorited</div>
      )}
    </div>
  )
}
