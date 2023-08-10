import useListings from '@/hooks/useListings'
import { truncate } from '@/lib/string'
import { faBath, faBed, faRuler } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useMap } from 'react-map-gl'

export default function ListingsPanel() {
  const { data: listings, isLoading, isError } = useListings()

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-y-4 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8'>
        <div className='pulse h-40 w-full rounded-xl border-2 border-gray-200'></div>
        <div className='pulse h-40 w-full rounded-xl border-2 border-gray-200'></div>
        <div className='pulse h-40 w-full rounded-xl border-2 border-gray-200'></div>
        <div className='pulse h-40 w-full rounded-xl border-2 border-gray-200'></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex h-60 flex-col items-center gap-5 overflow-y-scroll md:h-full'>
        <h1 className='w-full'>Listings</h1>
        <h2 className='text-red-500'>Sorry an error occurred :/</h2>
      </div>
    )
  }

  if (!listings || !listings?.features || listings.features.length === 0) {
    return (
      <div className='flex h-60 flex-col items-center gap-5 overflow-y-scroll md:h-full'>
        <h1 className='w-full'>No available listings</h1>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      {/* Search */}
      <div className='flex flex-1 justify-center pb-10'>
        <div className='w-full'>
          <label htmlFor='search' className='sr-only'>
            Move In
          </label>
          <div className='relative text-gray-400 focus-within:text-gray-600'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
            </div>
            <input
              id='search'
              className='block w-full rounded-md border-0 bg-gray-100 py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 sm:text-sm sm:leading-6'
              placeholder='Search'
              type='search'
              name='search'
            />
          </div>
        </div>
      </div>

      <div className='-mx-10 border-t-2 px-10'>
        <h2 className='sr-only'>Listings</h2>

        <div className='py-8'>
          <h3>
            <span className='font-bold'>{listings.features.length}</span> available apartments near
            Nothwestern University
          </h3>
        </div>

        <div className='grid grid-cols-1 gap-y-4 overflow-y-auto sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8'>
          {listings.features &&
            listings.features.map((listing, key) => (
              <Listing
                key={key}
                {...(listing.properties as ListingProps)}
                coordinates={[listing.geometry!.coordinates[0], listing.geometry!.coordinates[1]]}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

interface ListingProps {
  listing_id: number
  address_street: string
  address_city: string
  building_name: string
  preview_img_src: string
  beds: number
  baths: number
  square_footage: number
  price: number

  coordinates: [number, number]
}

function Listing({
  listing_id,
  address_street,
  preview_img_src,
  beds,
  baths,
  square_footage,
  price,
  coordinates,
}: ListingProps) {
  const { listingsMap } = useMap()

  const handleHover = () => {
    listingsMap?.flyTo({
      center: coordinates,
      zoom: 16,
    })
  }

  const hyphenatedAddress = address_street
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9\-]/g, '')
    .toLowerCase()

  return (
    <Link href={`/home-details/${hyphenatedAddress}/${listing_id}`}>
      <div
        key={listing_id}
        className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
        onMouseEnter={handleHover}
      >
        <div className='aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60'>
          {preview_img_src && (
            <img
              src={preview_img_src}
              alt='Property listing preview'
              className='h-full w-full object-cover object-center sm:h-full sm:w-full'
            />
          )}
        </div>
        <div className='p-3'>
          <h3 className='pb-3 text-base font-semibold text-gray-900'>
            <span aria-hidden='true' className='absolute inset-0' />
            {truncate(address_street, 18, true)}
          </h3>
          <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
            <div className='flex w-full items-center justify-center gap-5 text-base text-gray-700'>
              <h4 className='sr-only'>Beds</h4>
              <p>{beds}</p>
              <FontAwesomeIcon icon={faBed} />
            </div>

            <div className='flex items-center justify-center gap-5 text-base text-gray-700'>
              <h4 className='sr-only'>Baths</h4>
              <p>{baths}</p>
              <FontAwesomeIcon icon={faBath} />
            </div>

            <div className='flex items-center justify-center gap-1 text-gray-700'>
              <h4 className='sr-only'>Square Footage</h4>
              <p className='text-base'>{square_footage}</p>
              <p className='text-sm'>sqft</p>
            </div>

            <div className='flex items-center justify-center gap-1 text-gray-700'>
              <h4 className='text-base'>${price.toLocaleString()}</h4>
              <p className='text-sm'>/ mo</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
