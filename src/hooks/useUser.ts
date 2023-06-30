'use client'

import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from '@tanstack/react-query'

const getUser = async (userId: string | undefined) => {
    const supabase = createClientComponentClient<Database>()

    let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', userId)
        .single()

    if (error && status !== 406) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Profile not found')
    }

    return data
}

export default function useUser(userId: string | undefined) {
    return useQuery(['user', userId], () => getUser(userId))
}
