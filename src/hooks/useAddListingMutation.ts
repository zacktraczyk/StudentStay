'use client'

import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const coordToPgisPoint = (coord: [number, number]) => {
    return `POINT(${coord[0].toFixed(6)} ${coord[1].toFixed(6)})`
}

export type Listing = {
    locationLabel: string
    longitude: number
    latitude: number
    color: string
}

const addListing = async ({ locationLabel, longitude, latitude, color }: Listing) => {
    const supabase = createClientComponentClient<Database>()
    const locationPoint = coordToPgisPoint([longitude, latitude])

    const data = {
        label: locationLabel,
        color: color,
        location: locationPoint,
    }

    const { error } = await supabase.from('listingsdemo').insert(data)
    if (error) throw error
}

export default function useAddListingMutation() {
    const queryClient = useQueryClient()
    return useMutation(async (listing: Listing) => addListing(listing), {
        onSuccess: async (data) => {
            queryClient.refetchQueries(['listings'])
        },
    })
}
