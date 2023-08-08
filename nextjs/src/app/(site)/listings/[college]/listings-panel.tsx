import useListings from '@/hooks/useListings'
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

  return (
    <div className='bg-white'>
      <h2 className='sr-only'>Listings</h2>

      <div className='py-8'>
        <h3>
          <span className='font-bold'>{listings.features.length}</span> available apartments near
          Nothwestern University
        </h3>
      </div>

      <div className='grid grid-cols-1 gap-y-4 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8'>
        {listings.features &&
          listings.features.map((listing, key) => (
            <Listing
              key={key}
              {...(listing.properties as ListingProps)}
              coordinates={listing.geometry!.coordinates}
            />
          ))}
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
  address_city,
  building_name,
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
      zoom: 14,
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
        <div className='flex flex-1 flex-col space-y-2 p-4'>
          <h3 className='text-sm font-medium text-gray-900'>
            <span aria-hidden='true' className='absolute inset-0' />
            {building_name}
          </h3>
          <div className='flex flex-1 flex-col justify-end'>
            <p className='text-sm italic text-gray-500'>Beds: {beds}</p>
            <p className='text-sm italic text-gray-500'>Baths: {baths}</p>
            <p className='text-sm italic text-gray-500'>Sqft: {square_footage} ft^2</p>
            <p className='text-base font-medium text-gray-900'>${price.toLocaleString()} / month</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
