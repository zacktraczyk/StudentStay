'use client'

import { useSupabase } from '@/app/supabase-provider'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
})

type Profile = {
  full_name: string | null
  avatar_url: string | null
}

type FormSchemaType = z.infer<typeof formSchema>

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PersonalInformation({ profile: _profile }: { profile: Profile | null }) {
  const { supabase, session } = useSupabase()
  const profile = _profile || { full_name: '', avatar_url: '' }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const updateProfile: SubmitHandler<FormSchemaType> = async (data) => {
    console.log('updateProfile')

    let { error } = await supabase.from('profiles').upsert({
      profile_id: session?.user?.id as string,
      full_name: data.fullName || '',
    })

    if (error) throw error
  }

  return (
    <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
      <div>
        <h2 className='text-base font-semibold leading-7 text-black'>Personal Information</h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <form className='md:col-span-2'>
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
          <div className='col-span-full flex items-center gap-x-8'>
            <img
              src={
                profile?.avatar_url ||
                'https://www.reso.org/wp-content/uploads/2020/03/No-Photo-Available-591x591-2.jpg'
              }
              alt=''
              className='h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover'
            />
            <div>
              <button
                type='button'
                className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={() => alert('Not Implemented')}
              >
                Change avatar
              </button>
              <p className='mt-2 text-xs leading-5 text-gray-400'>JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <div className='col-span-full'>
            <label htmlFor='fullName' className='block text-sm font-medium leading-6 text-gray-900'>
              New Password
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <input
                type='text'
                id='fullName'
                defaultValue={profile?.full_name || ''}
                className={classNames(
                  errors.fullName
                    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                    : '',
                  'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                )}
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby='password-error'
                {...register('fullName')}
              />
              {errors.fullName && (
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                </div>
              )}
            </div>

            {errors.fullName && (
              <p className='mt-2 text-sm text-red-600' id='email-error'>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className='col-span-full'>
            <label htmlFor='last-name' className='block text-sm font-medium leading-6 text-black'>
              Your School<span className='font-normal text-gray-700'>*</span>
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='your-school'
                defaultValue='Northwestern University'
                className='block w-full cursor-not-allowed rounded-md border-0 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6'
                disabled
              />
            </div>
            <p className='pt-3 text-xs text-gray-400'>
              Only Northwestern University is supported at this time.
            </p>
          </div>
        </div>

        <div className='mt-8 flex'>
          <button
            type='submit'
            className='rounded-md bg-green-800 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700'
            onClick={handleSubmit(updateProfile)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
