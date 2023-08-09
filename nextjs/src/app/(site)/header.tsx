'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/logo.svg'
import { useSupabase } from '../supabase-provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings/northwestern' },
  { name: 'Roomates', href: '/roomates' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { session } = useSupabase()

  return (
    <header className='relative inset-x-0 top-0 z-50'>
      <nav
        className='mx-auto flex items-center justify-between gap-x-6 p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Student Stay</span>
            <Image priority className='h-8 w-auto' src={logo} alt='' />
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </Link>
          ))}
        </div>
        {!session || !session.user ? (
          <div className='flex flex-1 items-center justify-end gap-x-6'>
            <Link
              href='/login'
              className='hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900'
            >
              Log in{' '}
              <span aria-hidden='true'>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </Link>
            <Link
              href='/signup'
              className='rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
            >
              Sign up
            </Link>
          </div>
        ) : (
          <form
            action='/auth/signout'
            method='post'
            className='flex flex-1 items-center justify-end gap-x-6'
          >
            <button className='text-sm font-semibold leading-6 text-rose-500' type='submit'>
              Log out
            </button>
          </form>
        )}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center gap-x-6'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>StudentStay</span>
              <Image priority className='h-8 w-auto' src={logo} alt='' />
            </a>
            <Link
              href='/signup'
              className='ml-auto rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
            >
              Sign up
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='py-6'>
                {!session || !session.user ? (
                  <Link
                    href='/login'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Log in <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                ) : (
                  <form action='/auth/signout' method='post' className='py-6'>
                    <button
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-left text-base font-semibold leading-7 text-rose-500 hover:bg-gray-50'
                      type='submit'
                    >
                      Log out
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
