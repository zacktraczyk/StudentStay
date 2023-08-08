'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

const getListings = async () => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase.rpc('listings_with_geojson')

  if (error) {
    throw error
  }

  return data
}

export default function useListings() {
  return useQuery(['listings'], () => getListings())
}
