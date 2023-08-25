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
      <MatchingPreferences initialPreferences={preferences} />
    </div>
  )
}
