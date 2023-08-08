'use client'

import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type pli_insert = Database['public']['Tables']['profile_listing_interests']['Insert']

interface LikeListingParams {
  listing_id: pli_insert['listing_id']
  profile_id: pli_insert['profile_id']
  active: pli_insert['active']
}

const likeListing = async ({ profile_id, listing_id, active }: LikeListingParams) => {
  const supabase = createClientComponentClient<Database>()

  const { error } = await supabase
    .from('profile_listing_interests')
    .upsert({ profile_id, listing_id, active })
    .single()

  if (error) throw error

  return active
}

export default function useLikeListingUpdate() {
  const queryClient = useQueryClient()
  return useMutation(async (params: LikeListingParams) => likeListing(params), {
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(['listingLike', variables.listing_id, variables.profile_id], data)
    },
  })
}
