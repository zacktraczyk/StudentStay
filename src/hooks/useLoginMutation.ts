import { useMutation } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

const login = async ({ email, password }: { email: string; password: string }) => {
    const supabase = createClientComponentClient<Database>()

    const { data, error: AuthError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (AuthError) throw AuthError

    return data
}

export default function useLogin() {
    return useMutation(['login'], ({ email, password }: { email: string; password: string }) =>
        login({ email, password }),
    )
}
