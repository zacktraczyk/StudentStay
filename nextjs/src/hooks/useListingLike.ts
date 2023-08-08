'use client'

import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type pli_insert = Database['public']['Tables']['profile_listing_interests']['Insert']

interface LikeListingParams {
  listing_id: pli_insert['listing_id']
  profile_id: pli_insert['profile_id']
}

const likeListing = async ({ profile_id, listing_id }: LikeListingParams) => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from('profile_listing_interests')
    .select('active')
    .eq('profile_id', profile_id)
    .eq('listing_id', listing_id)
    .maybeSingle()

  if (error) throw error

  return (data && data!.active) || false
}

export default function useUpdateListingLike(params: LikeListingParams) {
  return useQuery(['listingLike', params.listing_id, params.profile_id], () => likeListing(params))
}
