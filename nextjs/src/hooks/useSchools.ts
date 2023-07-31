'use client'

import { FeatureCollection } from 'geojson'
import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

const getSchools = async () => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase.rpc('nearby_schools')

  if (error) {
    throw error
  }

  return data[0].json_build_object as FeatureCollection
}

export default function useSchools() {
  return useQuery<FeatureCollection>(['schools'], () => getSchools())
}
