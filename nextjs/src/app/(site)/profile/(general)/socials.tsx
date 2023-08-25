'use client'

import { useSupabase } from '@/app/supabase-provider'
import { classNames } from '@/lib/string'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

// TODO: Add validation
const formSchema = z.object({
  instagram: z.string().optional(),
  tictok: z.string().optional(),
  snapchat: z.string().optional(),
  facebook: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

interface SocialsProps {
  instagram_profile: string
  tictok_profile: string
  snapchat_profile: string
  facebook_profile: string
}

export default function Socials({ socials }: { socials: SocialsProps }) {
  const { supabase, session } = useSupabase()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const handleSocialChange: SubmitHandler<FormSchemaType> = async (data) => {
    console.log('updateSocials')

    let { error } = await supabase.from('profiles').upsert({
      profile_id: session?.user?.id as string,
      instagram_profile: data.instagram || '',
      tictok_profile: data.tictok || '',
      snapchat_profile: data.snapchat || '',
      facebook_profile: data.facebook || '',
    })

    if (error) throw error
  }

  return (
    <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
      <div>
        <h2 className='text-base font-semibold leading-7 text-black'>Social Links</h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>Link to your social media accounts.</p>
      </div>

      <form className='md:col-span-2' onSubmit={handleSubmit(handleSocialChange)}>
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
          <div className='col-span-full'>
            <label
              htmlFor='instagram'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Instagram
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <div
                className={classNames(
                  errors.instagram
                    ? 'text-red-900 ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus-within:ring-green-800',
                  'flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset',
                )}
              >
                <span
                  className={classNames(
                    errors.instagram ? 'text-red-900 ' : 'text-gray-500',
                    'flex select-none items-center pl-3 sm:text-sm',
                  )}
                >
                  @
                </span>
                <input
                  type='text'
                  id='instagram'
                  defaultValue={socials.instagram_profile}
                  {...register('instagram')}
                  className={classNames(
                    errors.instagram
                      ? 'text-red-900 placeholder:text-red-300'
                      : 'text-gray-900 placeholder:text-gray-400',
                    'block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6',
                  )}
                />

                {errors.instagram && (
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                  </div>
                )}
              </div>
            </div>

            {errors.instagram && (
              <p className='mt-2 text-sm text-red-600'>{errors.instagram.message}</p>
            )}
          </div>

          <div className='col-span-full'>
            <label htmlFor='tictok' className='block text-sm font-medium leading-6 text-gray-900'>
              TicTok
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <div
                className={classNames(
                  errors.tictok
                    ? 'text-red-900 ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus-within:ring-green-800',
                  'flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset',
                )}
              >
                <span
                  className={classNames(
                    errors.tictok ? 'text-red-900 ' : 'text-gray-500',
                    'flex select-none items-center pl-3 sm:text-sm',
                  )}
                >
                  @
                </span>
                <input
                  type='text'
                  id='tictok'
                  defaultValue={socials.tictok_profile}
                  {...register('tictok')}
                  className={classNames(
                    errors.tictok
                      ? 'text-red-900 placeholder:text-red-300'
                      : 'text-gray-900 placeholder:text-gray-400',
                    'block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6',
                  )}
                />

                {errors.tictok && (
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                  </div>
                )}
              </div>
            </div>

            {errors.tictok && <p className='mt-2 text-sm text-red-600'>{errors.tictok.message}</p>}
          </div>

          <div className='col-span-full'>
            <label htmlFor='snapchat' className='block text-sm font-medium leading-6 text-gray-900'>
              Snapchat
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <div
                className={classNames(
                  errors.snapchat
                    ? 'text-red-900 ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus-within:ring-green-800',
                  'flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset',
                )}
              >
                <span
                  className={classNames(
                    errors.snapchat ? 'text-red-900 ' : 'text-gray-500',
                    'flex select-none items-center pl-3 sm:text-sm',
                  )}
                >
                  @
                </span>
                <input
                  type='text'
                  id='snapchat'
                  defaultValue={socials.snapchat_profile}
                  {...register('snapchat')}
                  className={classNames(
                    errors.snapchat
                      ? 'text-red-900 placeholder:text-red-300'
                      : 'text-gray-900 placeholder:text-gray-400',
                    'block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6',
                  )}
                />

                {errors.snapchat && (
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                  </div>
                )}
              </div>
            </div>

            {errors.snapchat && (
              <p className='mt-2 text-sm text-red-600'>{errors.snapchat.message}</p>
            )}
          </div>

          <div className='col-span-full'>
            <label htmlFor='facebook' className='block text-sm font-medium leading-6 text-gray-900'>
              Facebook
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <div
                className={classNames(
                  errors.facebook
                    ? 'text-red-900 ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus-within:ring-green-800',
                  'flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset',
                )}
              >
                <span
                  className={classNames(
                    errors.facebook ? 'text-red-900 ' : 'text-gray-500',
                    'flex select-none items-center pl-3 sm:text-sm',
                  )}
                >
                  @
                </span>
                <input
                  type='text'
                  id='facebook'
                  defaultValue={socials.facebook_profile}
                  {...register('facebook')}
                  className={classNames(
                    errors.facebook
                      ? 'text-red-900 placeholder:text-red-300'
                      : 'text-gray-900 placeholder:text-gray-400',
                    'block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6',
                  )}
                />

                {errors.facebook && (
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                  </div>
                )}
              </div>
            </div>

            {errors.facebook && (
              <p className='mt-2 text-sm text-red-600'>{errors.facebook.message}</p>
            )}
          </div>
        </div>

        <div className='mt-8 flex'>
          <button
            type='submit'
            className='rounded-md bg-green-800 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
