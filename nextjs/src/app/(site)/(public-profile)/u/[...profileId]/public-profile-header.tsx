'use client'

import { useSupabase } from '@/app/supabase-provider'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Profile = {
  full_name: string
  pronouns: string
  email: string
  avatar_url: string
}

export default function PublicProfileHeader({ profile }: { profile: Profile }) {
  const { session } = useSupabase()
  const pathname = usePathname()
  const slug_profile_id = pathname.split('/')[2]

  const is_my_profile = session?.user?.id === slug_profile_id

  return (
    <div className='w-full'>
      <div>
        <img
          className='h-32 w-full rounded-t-lg object-cover lg:h-48'
          src={
            // TODO: profile.backgroundImage ||
            'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
          }
          alt=''
        />
      </div>
      <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
          <div className='flex'>
            <img
              className='h-24 w-24 rounded-full object-cover ring-4 ring-white sm:h-32 sm:w-32'
              src={profile.avatar_url}
              alt=''
            />
          </div>
          <div className='mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
            <div className='mt-6 min-w-0 flex-1 sm:hidden md:block'>
              <h1 className='truncate text-2xl font-bold text-gray-900'>
                {profile.full_name}
                <span className='text-base font-normal text-gray-700'> ({profile.pronouns})</span>
              </h1>
            </div>
            <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0'>
              {is_my_profile ? (
                <Link
                  href='/profile'
                  className='inline-flex justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
                >
                  <PencilIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                  <span>Edit</span>
                </Link>
              ) : (
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  <EnvelopeIcon
                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Message</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='mt-6 hidden min-w-0 flex-1 sm:block md:hidden'>
          <h1 className='truncate text-2xl font-bold text-gray-900'>{profile.full_name}</h1>
        </div>
      </div>
    </div>
  )
}
