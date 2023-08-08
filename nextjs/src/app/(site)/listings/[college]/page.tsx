'use client'

import { MapProvider } from 'react-map-gl'
import ListingsMap from './listings-map'
import { useState } from 'react'
import ListingsPanel from './listings-panel'

export default function Listings({ params }: { params: { college: string } }) {
  return (
    <MapProvider>
      <div className='flex h-full w-full flex-col-reverse md:flex-row'>
        <div className='flex h-2/3 w-full flex-col overflow-scroll p-10 md:block md:h-full md:w-3/4'>
          <ListingsPanel />
        </div>
        <div className='h-1/3 w-full md:block md:h-full'>
          <ListingsMap />
        </div>
      </div>
    </MapProvider>
  )
}
