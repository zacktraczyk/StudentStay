'use client'

import { useSupabase } from '@/app/supabase-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  fullName: z.string().optional(),
  username: z.string().optional(),
  website: z.string().url().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

export default async function General() {
  const { supabase, session } = useSupabase()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('profile_id', session?.user?.id)
    .maybeSingle()

  if (error) {
    console.error(error)
    return <div>error</div>
  }

  const updateProfile: SubmitHandler<FormSchemaType> = async (data) => {
    console.log('updateProfile')

    let { error } = await supabase.from('profiles').upsert({
      profile_id: session?.user?.id as string,
      full_name: data.fullName || '',
      website: data.website || '',
      updated_at: new Date().toISOString(),
    })

    if (error) throw error
  }

  return (
    <div className='divide-y divide-gray-300 overflow-y-scroll px-5 py-4'>
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
                src={profile?.avatar_url || 'https://avatars.dicebear.com/api/avataaars/1.svg'}
                alt=''
                className='h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover'
              />
              <div>
                <button
                  type='button'
                  className='rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/20'
                >
                  Change avatar
                </button>
                <p className='mt-2 text-xs leading-5 text-gray-400'>JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='last-name' className='block text-sm font-medium leading-6 text-black'>
                Your Name<span className='font-normal text-gray-700'>*</span>
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  id='your-name'
                  defaultValue={profile?.full_name || ''}
                  {...register('fullName')}
                  autoComplete='name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-black'>
                Username
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-800'>
                  <span className='flex select-none items-center pl-3 text-gray-400 sm:text-sm'>
                    example.com/
                  </span>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    className='flex-1 border-0 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='janesmith'
                  />
                </div>
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='timezone' className='block text-sm font-medium leading-6 text-black'>
                Timezone
              </label>
              <div className='mt-2'>
                <select
                  id='timezone'
                  name='timezone'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-800 sm:text-sm sm:leading-6'
                >
                  <option>Pacific Standard Time</option>
                  <option>Eastern Standard Time</option>
                  <option>Greenwich Mean Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className='mt-8 flex'>
            <button
              type='submit'
              className='rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700'
              onClick={handleSubmit(updateProfile)}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-black'>Change password</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            Update your password associated with your account.
          </p>
        </div>

        <form className='md:col-span-2'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='col-span-full'>
              <label
                htmlFor='current-password'
                className='block text-sm font-medium leading-6 text-black'
              >
                Current password
              </label>
              <div className='mt-2'>
                <input
                  id='current-password'
                  name='current_password'
                  type='password'
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='new-password'
                className='block text-sm font-medium leading-6 text-black'
              >
                New password
              </label>
              <div className='mt-2'>
                <input
                  id='new-password'
                  name='new_password'
                  type='password'
                  autoComplete='new-password'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-medium leading-6 text-black'
              >
                Confirm password
              </label>
              <div className='mt-2'>
                <input
                  id='confirm-password'
                  name='confirm_password'
                  type='password'
                  autoComplete='new-password'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>

          <div className='mt-8 flex'>
            <button
              type='submit'
              className='rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-black'>Log out other sessions</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            Please enter your password to confirm you would like to log out of your other sessions
            across all of your devices.
          </p>
        </div>

        <form className='md:col-span-2'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='col-span-full'>
              <label
                htmlFor='logout-password'
                className='block text-sm font-medium leading-6 text-black'
              >
                Your password
              </label>
              <div className='mt-2'>
                <input
                  id='logout-password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>

          <div className='mt-8 flex'>
            <button
              type='submit'
              className='rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700'
            >
              Log out other sessions
            </button>
          </div>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-black'>Delete account</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            No longer want to use our service? You can delete your account here. This action is not
            reversible. All information related to this account will be deleted permanently.
          </p>
        </div>

        <form className='flex items-start md:col-span-2'>
          <button
            type='submit'
            className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400'
          >
            Yes, delete my account
          </button>
        </form>
      </div>
    </div>
  )
}
