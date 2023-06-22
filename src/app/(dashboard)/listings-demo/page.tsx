'use client'

import LocationCreate from './listings-create'
import Listings from './listings'
import ListingsMap from './listings-map'
import { MapProvider } from 'react-map-gl'
import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../../public/logo.svg'

function ListingsDemo() {
    return (
        <div className='flex h-[100em] w-full flex-col md:h-full md:flex-row'>
            <MapProvider>
                <SideMenu />
                <ListingsMap />
            </MapProvider>
        </div>
    )
}

function SideMenu() {
    return (
        <div className='flex flex-col items-stretch p-10'>
            <div className='mb-10 flex lg:flex-1'>
                <Link href='/' className='-m-1.5 p-1.5'>
                    <span className='sr-only'>Student Stay</span>
                    <Image priority className='h-8 w-auto' src={logo} alt='' />
                </Link>
            </div>
            <LocationCreate />
            <hr className='my-8 h-px border-0 bg-gray-200' />
            <Listings />
        </div>
    )
}

export default ListingsDemo
