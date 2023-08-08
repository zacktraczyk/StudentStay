'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

const getListing = async (listingID: string) => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('listing_id', listingID)
    .single()

  if (error) {
    throw error
  }

  return data
}

export default function useListing(listingID: string) {
  return useQuery(['listing', listingID], () => getListing(listingID))
}
