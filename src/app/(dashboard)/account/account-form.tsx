'use client'

import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    fullName: z.string().optional(),
    username: z.string().optional(),
    website: z.string().url().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

export default function AccountForm({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const user = session?.user

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                reset({
                    fullName: data.full_name || '',
                    username: data.username || '',
                    website: data.website || '',
                })
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase, reset])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    const updateProfile: SubmitHandler<FormSchemaType> = async (data) => {
        console.log('updateProfile')
        try {
            setLoading(true)

            let { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: data.fullName || '',
                username: data.username || '',
                website: data.website || '',
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='form-widget'>
            <form onSubmit={handleSubmit(updateProfile)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text' value={session?.user.email} disabled />
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input id='fullName' type='text' {...register('fullName')} />
                    {errors.fullName && (
                        <span className='mt-2 text-xs text-rose-500'>
                            {errors.fullName.message}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='text' {...register('username')} />
                    {errors.username && (
                        <span className='mt-2 text-xs text-rose-500'>
                            {errors.username.message}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor='website'>Website</label>
                    <input id='website' type='url' {...register('website')} />
                    {errors.website && (
                        <span className='mt-2 text-xs text-rose-500'>{errors.website.message}</span>
                    )}
                </div>
                <div>
                    <button type='submit' className='button primary block' disabled={loading}>
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>
            </form>

            <div>
                <form action='/auth/signout' method='post'>
                    <button className='button block' type='submit'>
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}
