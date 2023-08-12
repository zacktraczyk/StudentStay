'use client'

import { Fragment, RefObject, forwardRef, useState } from 'react'
import { Menu, Transition, Popover, Dialog, Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
  AcademicCapIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'

import logo from '../../../public/logo.svg'
import { classNames } from '@/lib/string'

type Profile = {
  full_name: string
  email: string
  avatar_url: string
}

const profileNavigation = [{ name: 'Your Profile', href: '/profile' }]

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Listings',
    two_column_sub_menu: [
      {
        name: 'Listings Around Me',
        description: 'Find listings around your school',
        href: '/listings/northwestern',
        icon: AcademicCapIcon,
      },
      {
        name: 'Favorite Listings',
        description: 'Look back at saved listings',
        href: '#',
        icon: HeartIcon,
      },
    ],
  },
  {
    name: 'Roomates',
    two_column_sub_menu: [
      {
        name: 'Suggested Roomates',
        description: 'Curated list of roomates in your area',
        href: '/roomates',
        icon: UserIcon,
      },
    ],
  },
  { name: 'About', href: '/about' },
]

interface MyLinkProps {
  href: string
  children: React.ReactNode
  [x: string]: any
}

const MyLink = forwardRef((props: MyLinkProps, ref) => {
  let { href, children, ...rest } = props
  return (
    <Link legacyBehavior href={href}>
      {/* TODO: Fix this cursed type fix */}
      <a ref={ref as RefObject<HTMLAnchorElement>} {...rest}>
        {children}
      </a>
    </Link>
  )
})

MyLink.displayName = 'MyLink'

export default function Header({ profile }: { profile: Profile | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const isListingView = pathname.includes('/listings')

  const handleNotificationClick = () => {
    alert('Sorry! Feature not implemented yet.')
  }

  return (
    <header className='relative inset-x-0 top-0 z-50'>
      {/* Bigger Screen Navbar */}
      <nav
        className={classNames(
          isListingView ? '' : 'max-w-7xl',
          'mx-auto flex items-center justify-between gap-x-6 p-6 sm:px-8',
        )}
        aria-label='Global'
      >
        {/* Logo */}
        <div className='flex sm:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Student Stay</span>
            <Image priority className='h-8 w-auto' src={logo} alt='' />
          </Link>
        </div>
        {/* Navigation */}
        <div className='hidden sm:flex sm:gap-x-12'>
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.two_column_sub_menu ? (
                <Link href={item.href} className='text-sm font-semibold leading-6 text-gray-900'>
                  {item.name}
                </Link>
              ) : (
                <Popover className='relative' key={item.name}>
                  <Popover.Button className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
                    <span>{item.name}</span>
                    <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4'>
                      {({ close }) => (
                        <div className='w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                          <div className='grid grid-cols-1 gap-x-6 gap-y-1 p-4'>
                            {item.two_column_sub_menu.map((sub_item) => (
                              <MyLink
                                href={sub_item.href}
                                onClick={() => close()}
                                key={sub_item.name}
                              >
                                <div className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'>
                                  <div className='mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                                    <sub_item.icon
                                      className='h-6 w-6 text-gray-600 group-hover:text-green-800'
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <div>
                                    <p className='font-semibold text-gray-900'>{sub_item.name}</p>
                                    <span className='absolute inset-0' />
                                    <p className='mt-1 text-gray-600'>{sub_item.description}</p>
                                  </div>
                                </div>
                              </MyLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )}
            </div>
          ))}
        </div>
        {/* Account */}
        {!profile ? (
          <div className='flex flex-1 items-center justify-end gap-x-6' key='noprofile'>
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
          <div className=';g:ml-6 hidden flex-1 justify-end sm:flex sm:items-center' key='profile'>
            <button
              type='button'
              className='relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2'
              onClick={() => handleNotificationClick()}
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
                  <span className='sr-only'>Open profile menu</span>
                  <img
                    className='h-8 w-8 rounded-full object-cover'
                    src={profile?.avatar_url}
                    alt=''
                  />
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
                  {profileNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {/* TODO: Change <a> to Next/Link without breaking Headless UI Menu */}
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <form action='/auth/signout' method='post' className='w-full' key='logout'>
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

      {/* Smaller Screen Navbar */}
      <Dialog as='div' className='sm:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center gap-x-6'>
            {/* Top logo / button */}
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>StudentStay</span>
              <Image priority className='h-8 w-auto' src={logo} alt='' />
            </Link>
            <div className='ml-auto flex items-center gap-x-6'>
              {!profile && (
                <Link
                  href='/signup'
                  className='rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
                >
                  Sign up
                </Link>
              )}
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
          </div>
          {/* navbar links */}
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <div key={item.name}>
                    {!item.two_column_sub_menu ? (
                      <Link
                        href={item.href}
                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as='div' className='-mx-3'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                              {item.name}
                              <ChevronDownIcon
                                className={classNames(
                                  open ? 'rotate-180' : '',
                                  'h-5 w-5 flex-none',
                                )}
                                aria-hidden='true'
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className='mt-2 space-y-2'>
                              {[...item.two_column_sub_menu].map((sub_item) => (
                                <Link href={sub_item.href} passHref key={sub_item.name}>
                                  <Disclosure.Button
                                    as='a'
                                    className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                  >
                                    {sub_item.name}
                                  </Disclosure.Button>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </div>
                ))}
              </div>
              <div className='space-y-2 py-6'>
                {!profile ? (
                  <Link
                    href='/login'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Log in <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                ) : (
                  <div className='pb-3'>
                    <div className='flex items-center'>
                      <div className='shrink-0'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src={profile.avatar_url}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium text-gray-800'>
                          {profile.full_name}
                        </div>
                        <div className='text-sm font-medium text-gray-500'>{profile.email}</div>
                      </div>
                      <button
                        type='button'
                        className='relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={() => handleNotificationClick()}
                      >
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    <div className='space-y-2 py-6'>
                      {profileNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}

                      <form action='/auth/signout' method='post'>
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
