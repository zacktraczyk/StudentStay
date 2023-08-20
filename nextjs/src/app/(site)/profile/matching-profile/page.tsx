'use client'

import MatchingPreferences from './matching-preferences'
import { useSupabase } from '@/app/supabase-provider'

export default async function MatchingProfile() {
  const { supabase, session } = useSupabase()

  const { data: preferences, error } = await supabase
    .from('housing_preferences')
    .select('*')
    .eq('profile_id', session?.user?.id)
    .maybeSingle()

  return (
    // <div className='divide-y divide-gray-300 px-4 py-16 sm:px-6 lg:px-8'>
    <div className='px-4 py-16 sm:px-6 lg:px-8'>
      <div className='pb-12'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>Matching Profile</h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          This preferences will be used to help match you with potential roomates.
        </p>
      </div>
      <MatchingPreferences initialPreferences={preferences} />
    </div>
  )
}
