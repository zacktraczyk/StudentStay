'use client'

import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/logo.svg'
import { useSupabase } from '../supabase-provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'

type Profile = {
  full_name: string
  email: string
  avatar_url: string
}

const userNavigation = [
  { name: 'Your Profile', href: '/account' },
  { name: 'Settings', href: '#' },
]

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings/northwestern' },
  { name: 'Roomates', href: '/roomates' },
  { name: 'About', href: '/about' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { supabase, session } = useSupabase()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [user, setUser] = useState<Profile | null>(null)

  const isListingView = pathname.includes('/listings')
  console.log(isListingView)
  console.log(pathname)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('profile_id', session?.user?.id)
        .single()

      if (error) console.error(error)

      console.log('header profile data:', data)
      setUser({
        full_name: data?.full_name || 'NAME MISSING',
        avatar_url: data?.avatar_url || '',
        email: session!.user!.email || 'MISSING EMAIL',
      })
    }

    if (!session) return

    fetchProfile()
  }, [session])

  return (
    <header className='relative inset-x-0 top-0 z-50'>
      <nav
        className={classNames(
          isListingView ? '' : 'max-w-7xl',
          'mx-auto flex items-center justify-between gap-x-6 p-6 sm:px-8',
        )}
        aria-label='Global'
      >
        <div className='flex sm:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Student Stay</span>
            <Image priority className='h-8 w-auto' src={logo} alt='' />
          </Link>
        </div>
        <div className='hidden sm:flex sm:gap-x-12'>
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
        {!session || !user ? (
          <div className='flex flex-1 items-center justify-end gap-x-6'>
            <Link
              href='/login'
              className='hidden sm:block sm:text-sm sm:font-semibold sm:leading-6 sm:text-gray-900'
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
          <div className=';g:ml-6 hidden flex-1 justify-end sm:flex sm:items-center'>
            <button
              type='button'
              className='relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2'
            >
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>View notifications</span>
              <BellIcon className='h-6 w-6' aria-hidden='true' />
            </button>

            {/* Profile dropdown */}
            <Menu as='div' className='relative ml-3'>
              <div>
                <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  <img className='h-8 w-8 rounded-full object-cover' src={user.avatar_url} alt='' />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <form action='/auth/signout' method='post' className='w-full'>
                        <button
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block w-full px-4 py-2 text-left text-sm text-rose-500',
                          )}
                          type='submit'
                        >
                          Log out
                        </button>
                      </form>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
        <div className='flex sm:hidden'>
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
      <Dialog as='div' className='sm:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='space-y-2 py-6'>
                {!session || !user ? (
                  <Link
                    href='/login'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Log in <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                ) : (
                  <div className='pb-3'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <img className='h-10 w-10 rounded-full' src={user.avatar_url} alt='' />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium text-gray-800'>{user.full_name}</div>
                        <div className='text-sm font-medium text-gray-500'>{user.email}</div>
                      </div>
                      <button
                        type='button'
                        className='relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    <div className='space-y-2 py-6'>
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}

                      <form action='/auth/signout' method='post' className=''>
                        <button
                          className='-mx-3 block w-full px-3 py-2 text-left text-base font-semibold text-rose-400 hover:bg-gray-50'
                          type='submit'
                        >
                          Log out
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
