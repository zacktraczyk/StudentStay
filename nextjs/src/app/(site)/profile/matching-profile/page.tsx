'use client'

import { useState } from 'react'

export default function MatchingProfile() {
  const [sliderValue, setSliderValue] = useState(3)
  return (
    <div className='divide-y divide-gray-300'>
      <div className='flex w-80 flex-col space-y-2 p-2'>
        <input
          type='range'
          className='h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-800 active:accent-green-900'
          min='1'
          max='5'
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.valueAsNumber)}
          step='1'
        />
        <ul className='flex w-full justify-between px-[10px]'>
          <li className='relative flex justify-center'>
            <span className='absolute'>1H</span>
          </li>
          <li className='relative flex justify-center'>
            <span className='absolute'>1D</span>
          </li>
          <li className='relative flex justify-center'>
            <span className='absolute'>1W</span>
          </li>
          <li className='relative flex justify-center'>
            <span className='absolute'>1M</span>
          </li>
          <li className='relative flex justify-center'>
            <span className='absolute'>1Y</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
