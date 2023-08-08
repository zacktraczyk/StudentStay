'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

type listing_id_type = Database['public']['Tables']['listings']['Insert']['listing_id']

const getListing = async (listing_id: listing_id_type) => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('listing_id', listing_id)
    .single()

  if (error) {
    throw error
  }

  return data
}

export default function useListing(listing_id: listing_id_type) {
  return useQuery(['listing', listing_id], () => getListing(listing_id))
}
