'use client'

import { useSupabase } from '@/app/supabase-provider'
import { classNames } from '@/lib/string'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

const getAllDaysInMonth = (month: number, year: number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1),
  )

export default function FindListingsBlurb() {
  const { supabase, session } = useSupabase()

  useEffect(() => {}, [supabase, session?.user])

  return (
    <div className='rounded-2xl border-2 p-5 shadow-md'>
      <div>
        <label htmlFor='location' className='block text-sm font-medium leading-6 text-gray-900'>
          School
        </label>
        <select
          id='location'
          name='location'
          className='mt-2 block w-full cursor-not-allowed rounded-md border-0 bg-gray-100 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-800 sm:text-sm sm:leading-6'
          defaultValue='Northwestern'
          disabled
        >
          <option>Northwestern</option>
          {/* <option>Canada</option>
          <option>Mexico</option> */}
        </select>
      </div>

      <p className='pt-3 text-xs text-gray-400'>
        Only Northwestern University is supported at this time.
      </p>

      <div className='mt-3 flex w-full justify-end'>
        <Link
          href='/signup'
          className='rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
        >
          Join now
        </Link>
      </div>
    </div>
  )
}

// TODO: Finish custom Datepicker
function CalendarPicker() {
  const date_today = new Date()
  const all_days = getAllDaysInMonth(date_today.getMonth() + 1, date_today.getFullYear())

  const selected_month = date_today.toLocaleString('default', { month: 'long' })
  const first_day = new Date(date_today.getFullYear(), date_today.getMonth(), 1).getDay()
  console.log(
    'first day of month date:',
    new Date(date_today.getFullYear(), date_today.getMonth(), 0),
  )
  const month = all_days.map((day) => day.toLocaleDateString())

  // console.log(month)

  return (
    <div>
      <label
        htmlFor='calendar'
        className='block text-sm font-medium leading-6 text-gray-900'
      ></label>
      <div id='calendar' className='bg-white'>
        <div className='mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4'>
          <section key={selected_month} className='text-center'>
            <h2 className='text-sm font-semibold text-gray-900'>{selected_month}</h2>
            <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500'>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow'>
              {[...Array(first_day)].map((_, idx) => (
                <div key={idx}></div>
              ))}
              {month.map((day, dayIdx) => (
                <button
                  key={day}
                  type='button'
                  className={classNames(
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === month.length - 7 && 'rounded-bl-lg',
                    dayIdx === month.length - 1 && 'rounded-br-lg',
                    'group bg-white py-1.5 text-gray-900 focus:z-10',
                  )}
                >
                  <time
                    dateTime={date_today.toLocaleDateString()}
                    className={classNames(
                      date_today.toLocaleDateString() === day &&
                        'bg-green-800 font-semibold text-white',
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full group-hover:border-2 group-hover:border-green-800',
                    )}
                  >
                    {day!.split('/')[1].replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
