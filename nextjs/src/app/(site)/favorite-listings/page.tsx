'use client'

import { useSupabase } from '@/app/supabase-provider'
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function FavoriteListingsPage() {
  const { session, supabase } = useSupabase()
  const { data: listings, error } = await supabase.rpc('favorited_listings', {
    current_profile_id: session?.user.id,
  })

  if (error) console.error(error)

  return (
    <div className='mx-auto max-w-7xl flex-col items-center justify-between gap-x-6 p-6 sm:px-8'>
      <div>
        <h2 className='pt-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          Favorite Listings
        </h2>
        <p className='py-5 text-gray-600'>
          Here are your favorite listings. You can click on the listing to view it, or click on the
          minus to remove it from your favorites.
        </p>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {listings && listings.map((listing, key) => <Listing key={key} {...listing} />)}
      </div>
    </div>
  )
}

interface ListingProps {
  listing_id: number
  address_street: string | null
  address_city: string | null
  building_name: string | null
  preview_img_src: string | null
  beds: number | null
  baths: number | null
  square_footage: number | null
  price: number | null
}

function Listing({
  listing_id,
  address_street,
  preview_img_src,
  beds,
  baths,
  square_footage,
  price,
}: ListingProps) {
  return (
    <Link href={`/home-details/${listing_id}`}>
      <div
        key={listing_id}
        className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
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
          <h3 className='truncate pb-3 text-base font-semibold text-gray-900'>
            <span aria-hidden='true' className='absolute inset-0' />
            {address_street}
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
              <h4 className='text-base'>${price ? price.toLocaleString() : 0}</h4>
              <p className='text-sm'>/ mo</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
