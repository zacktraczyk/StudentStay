'use client'

import { classNames } from '@/lib/string'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

// TODO: Fix validation and password change request
const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, 'Old password is required')
      .min(8, 'Password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New Password must be at least 8 characters')
      .min(1, 'Password is required'),
    newPasswordConfirm: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirm'],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'New Password must be different from old Password',
    path: ['newPassword'],
  })

type FormSchemaType = z.infer<typeof formSchema>

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const handleRegister: SubmitHandler<FormSchemaType> = async (data) => {
    alert('Sorry! Feature not implemented yet. Cannot change password')
  }

  return (
    <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
      <div>
        <h2 className='text-base font-semibold leading-7 text-black'>Change password</h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>
          Update your password associated with your account.
        </p>
      </div>

      <form className='md:col-span-2' onSubmit={handleSubmit(handleRegister)}>
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
          <div className='col-span-full'>
            <label
              htmlFor='oldPassword'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Current Password
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <input
                type='password'
                id='oldPassword'
                {...register('oldPassword')}
                className={classNames(
                  errors.oldPassword
                    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                    : '',
                  'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                )}
                aria-invalid={errors.oldPassword ? 'true' : 'false'}
                aria-describedby='password-error'
              />
              {errors.oldPassword && (
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                </div>
              )}
            </div>

            {errors.oldPassword && (
              <p className='mt-2 text-sm text-red-600' id='email-error'>
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className='col-span-full'>
            <label
              htmlFor='newPassword'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              New Password
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <input
                type='password'
                id='newPassword'
                {...register('newPassword')}
                className={classNames(
                  errors.newPassword
                    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                    : '',
                  'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                )}
                aria-invalid={errors.newPassword ? 'true' : 'false'}
                aria-describedby='password-error'
              />
              {errors.newPassword && (
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                </div>
              )}
            </div>

            {errors.newPassword && (
              <p className='mt-2 text-sm text-red-600' id='email-error'>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className='col-span-full'>
            <label
              htmlFor='newPassword-confirm'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Confirm Password
            </label>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <input
                type='password'
                id='password-confirm'
                {...register('newPasswordConfirm')}
                className={classNames(
                  errors.newPasswordConfirm
                    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                    : '',
                  'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                )}
                aria-invalid={errors.newPasswordConfirm ? 'true' : 'false'}
                aria-describedby='password-error'
              />
              {errors.newPasswordConfirm && (
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
                </div>
              )}
            </div>

            {errors.newPasswordConfirm && (
              <p className='mt-2 text-sm text-red-600' id='email-error'>
                {errors.newPasswordConfirm.message}
              </p>
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
