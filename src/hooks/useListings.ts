'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database, ListingsGeojson } from '@/lib/database.types'

const getListings = async () => {
    const supabase = createClientComponentClient<Database>()
    const { data, error } = await supabase.rpc('nearby_listings_demo')

    if (error) {
        throw error
    }

    return data[0].json_build_object
}

export default function useListings() {
    return useQuery<ListingsGeojson>(['listings'], () => getListings())
}
