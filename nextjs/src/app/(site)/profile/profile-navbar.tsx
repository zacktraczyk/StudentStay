'use client'

import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const secondaryNavigation = [
  { name: 'General', href: '', icon: UserCircleIcon },
  { name: 'Matching Profile', href: '/matching-profile', icon: UsersIcon },
  { name: 'Notifications', href: '#', icon: BellIcon },
  { name: 'Plan', href: '#', icon: CubeIcon },
  { name: 'Billing', href: '#', icon: CreditCardIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileNavbar() {
  const pathname = usePathname()

  return (
    <aside className='flex items-center justify-center overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20'>
      <nav className='flex-none px-4 sm:px-6 lg:px-0'>
        <ul role='list' className='flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col'>
          {secondaryNavigation.map((item) => (
            <li key={item.name}>
              <Link
                href={`/profile/${item.href}`}
                className={classNames(
                  '/profile' + item.href === pathname
                    ? 'bg-gray-50 text-green-800'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-800',
                  'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6',
                )}
              >
                <item.icon
                  className={classNames(
                    '/profile' + item.href === pathname
                      ? 'text-green-800'
                      : 'text-gray-400 group-hover:text-green-800',
                    'h-6 w-6 shrink-0',
                  )}
                  aria-hidden='true'
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
