'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckEmailModal from './check-email-modal'

import logo from '../../../../public/logo.svg'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { classNames } from '@/lib/string'

const formSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .min(1, 'Password is required'),
    passwordConfirm: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  })

type FormSchemaType = z.infer<typeof formSchema>

export default function SignUp() {
  const supabase = createClientComponentClient()
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const handleRegister: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const { error: AuthError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      })
      if (AuthError) throw AuthError
      setOpenModal(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <CheckEmailModal open={openModal} setOpen={setOpenModal} />

      <div className='flex min-h-full flex-1'>
        <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <Link href='/'>
                <Image priority className='h-10 w-auto' src={logo} alt='StudentStay' />
              </Link>
              <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Create an account
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-500'>
                Already a member?{' '}
                <Link href='/login' className='font-semibold text-green-800 hover:text-green-700'>
                  Login
                </Link>
              </p>
            </div>

            <div className='mt-10'>
              <div>
                <form onSubmit={handleSubmit(handleRegister)} className='space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email
                    </label>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                      <input
                        type='email'
                        {...register('email')}
                        name='email'
                        id='email'
                        className={classNames(
                          errors.email
                            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                            : '',
                          'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                        )}
                        placeholder='you@example.com'
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby='password-error'
                      />
                      {errors.email && (
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                          <ExclamationCircleIcon
                            className='h-5 w-5 text-red-500'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>

                    {errors.email && (
                      <p className='mt-2 text-sm text-red-600' id='email-error'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Password
                    </label>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                      <input
                        type='password'
                        {...register('password')}
                        name='password'
                        id='password'
                        className={classNames(
                          errors.password
                            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                            : '',
                          'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                        )}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        aria-describedby='password-error'
                      />
                      {errors.password && (
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                          <ExclamationCircleIcon
                            className='h-5 w-5 text-red-500'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>

                    {errors.password && (
                      <p className='mt-2 text-sm text-red-600' id='email-error'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='password-confirm'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Confirm Password
                    </label>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                      <input
                        type='password'
                        {...register('passwordConfirm')}
                        name='passwordConfirm'
                        id='password-confirm'
                        className={classNames(
                          errors.passwordConfirm
                            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                            : '',
                          'block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6',
                        )}
                        aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                        aria-describedby='password-error'
                      />
                      {errors.passwordConfirm && (
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                          <ExclamationCircleIcon
                            className='h-5 w-5 text-red-500'
                            aria-hidden='true'
                          />
                        </div>
                      )}
                    </div>

                    {errors.passwordConfirm && (
                      <p className='mt-2 text-sm text-red-600' id='email-error'>
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='mt-10 flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </>
  )
}
