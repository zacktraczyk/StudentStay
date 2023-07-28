import useListings from '@/hooks/useListings'
import Link from 'next/link'
import { useMap } from 'react-map-gl'

export default function ListingsPanel() {
  const { data: listings, isLoading, isError } = useListings()

  if (listings) console.log(listings.features[0])

  if (isLoading) {
    return (
      <div className='flex h-60 flex-col items-center gap-5 overflow-y-scroll md:h-full'>
        <h1 className='w-full'>Listings</h1>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
        <div className='flex w-full animate-pulse items-center justify-center rounded-lg border-2 p-3 hover:bg-gray-100'>
          <p className='h-5 w-20 rounded bg-gray-200 text-center'></p>
        </div>
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

      <div>
        <h3>
          <span className='bold'>666</span> Avaiable Apartments in Placeholder, IL
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
  listingid: number
  listing_name: string
  preview_imgs: string[]
  beds: number
  baths: number
  size_square_feet: number
  monthly_cost: number

  coordinates: [number, number]
}

function Listing({
  listingid,
  listing_name,
  preview_imgs,
  beds,
  baths,
  size_square_feet,
  monthly_cost,
  coordinates,
}: ListingProps) {
  const { listingsMap } = useMap()

  const handleHover = () => {
    listingsMap?.flyTo({
      center: coordinates,
    })
  }

  return (
    <Link href={`/listings/${listingid}`}>
      <div
        key={listingid}
        className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
        onMouseEnter={handleHover}
      >
        <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
          <img
            src={preview_imgs[0]}
            alt='Property listing preview'
            className='h-full w-full object-cover object-center sm:h-full sm:w-full'
          />
        </div>
        <div className='flex flex-1 flex-col space-y-2 p-4'>
          <h3 className='text-sm font-medium text-gray-900'>
            <span aria-hidden='true' className='absolute inset-0' />
            {listing_name}
          </h3>
          <div className='flex flex-1 flex-col justify-end'>
            <p className='text-sm italic text-gray-500'>{beds}</p>
            <p className='text-sm italic text-gray-500'>{baths}</p>
            <p className='text-sm italic text-gray-500'>{size_square_feet} ft^2</p>
            <p className='text-base font-medium text-gray-900'>${monthly_cost} / month</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
