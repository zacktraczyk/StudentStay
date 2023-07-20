'use client'

import { MapProvider } from 'react-map-gl'
import ListingsMap from './listings-map'
import Example from './tailwind'
import { useState } from 'react'

export default function Listings() {
  const [mapToggle, setMapToggle] = useState(false)

  return (
    <MapProvider>
      <div className={`mt-20 flex w-full md:h-full ${mapToggle ? 'h-screen' : 'h-auto'}`}>
        <div
          className={`flex w-full flex-col overflow-scroll p-10 md:block md:w-3/4 ${
            mapToggle ? 'hidden' : 'block'
          }`}
        >
          <Example />
        </div>
        <div className={`w-full md:block ${mapToggle ? 'block' : 'hidden'}`}>
          <ListingsMap />
        </div>
      </div>
      <div className='fixed bottom-20 left-1/2 block -translate-x-1/2 rounded-2xl bg-rose-300 px-10 py-2 md:hidden'>
        <div className='h-full w-full' onClick={() => setMapToggle(!mapToggle)}>
          {mapToggle ? 'Listings' : 'Map'}
        </div>
      </div>
    </MapProvider>
  )
}
