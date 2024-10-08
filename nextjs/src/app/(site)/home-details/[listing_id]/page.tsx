'use client'

import { Tab } from '@headlessui/react'
import { useSupabase } from '@/app/supabase-provider'
import FavoriteButton from './favorite-button'
import Image from 'next/image'
import InterestedProfiles from './interested-profiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faRuler } from '@fortawesome/free-solid-svg-icons'
import { classNames } from '@/lib/string'

export default async function HomeDetails({
  params: { listing_id: _listing_id },
}: {
  params: { listing_id: string }
}) {
  const listing_id = Number(_listing_id)
  const { supabase, session } = useSupabase()

  // TODO: Load listing and favorite in parallel
  // Load listing
  const { data: listing, error: listing_error } = await supabase
    .from('listings')
    .select('*')
    .eq('listing_id', listing_id)
    .single()

  if (listing == null || listing_error) {
    throw listing_error
  }

  // Load favorite
  let favorited = false

  if (session != null) {
    const { data: favorited_data, error: favorite_error } = await supabase
      .from('profile_listing_interests')
      .select('active')
      .eq('profile_id', session?.user.id || '')
      .eq('listing_id', listing_id)
      .maybeSingle()

    if (favorite_error || favorited_data?.active == null) {
      console.error(favorite_error)
    } else {
      favorited = favorited_data!.active
    }
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            {/* Image selector */}
            <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
              <Tab.List className='grid grid-cols-4 gap-6'>
                {listing.additional_img_srcs &&
                  listing.additional_img_srcs.map((image, key) => (
                    <Tab
                      key={key}
                      className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                    >
                      {({ selected }) => (
                        <>
                          <span className='absolute inset-0 overflow-hidden rounded-md'>
                            <Image
                              src={image}
                              width={500}
                              height={200}
                              alt='rental listing preview'
                              className='h-full w-full object-cover object-center'
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-green-800' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </Tab>
                  ))}
              </Tab.List>
            </div>

            <Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
              {listing.additional_img_srcs &&
                listing.additional_img_srcs.map((image, key) => (
                  <Tab.Panel key={key}>
                    <Image
                      width={500}
                      height={200}
                      alt='house additional preview'
                      src={image}
                      className='h-full w-full object-cover object-center sm:rounded-lg'
                    />
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {listing.address_street}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>

              {listing.price ? (
                <p className='text-3xl tracking-tight text-gray-900'>
                  ${listing.price.toLocaleString()}
                  <span className='text-xl'> / month</span>
                </p>
              ) : (
                <p className='text-3xl tracking-tight text-gray-700'>Contact for pricing</p>
              )}
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <div className='space-y-6 text-base text-gray-700'>
                <p>{listing.description}</p>
              </div>
            </div>

            <form className='mt-6'>
              <div className='mt-10 flex'>
                <button
                  type='submit'
                  className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-green-800 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
                >
                  Does Nothing
                </button>

                <FavoriteButton initial_favorite={favorited} listing_id={listing_id} />
              </div>
            </form>

            <div className='mt-6'>
              <h3 className='sr-only'>Home Details</h3>

              <div className='flex items-center gap-5 space-y-6 text-base text-gray-700'>
                <h4 className='sr-only'>Beds</h4>
                <FontAwesomeIcon icon={faBed} />
                <p>{listing.beds} Beds</p>
              </div>

              <div className='flex items-center gap-5 space-y-6 text-base text-gray-700'>
                <h4 className='sr-only'>Baths</h4>
                <FontAwesomeIcon icon={faBath} />
                <p>{listing.baths} Baths</p>
              </div>

              <div className='flex items-center gap-5 space-y-6 text-base text-gray-700'>
                <h4 className='sr-only'>Square Footage</h4>
                <FontAwesomeIcon icon={faRuler} />
                <p>{listing.square_footage} sqft</p>
              </div>
            </div>

            {/* Interested Users */}
            <InterestedProfiles listing_id={listing_id} />

            {/* <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className='sr-only'>
                Additional details
              </h2>

              <div className='divide-y divide-gray-200 border-t'>
                {product.details.map((detail) => (
                  <Disclosure as='div' key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>
                            <span
                              className={classNames(
                                open ? 'text-green-800' : 'text-gray-900',
                                'text-sm font-medium',
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className='ml-6 flex items-center'>
                              {open ? (
                                <MinusIcon
                                  className='block h-6 w-6 text-green-700 group-hover:text-green-800'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusIcon
                                  className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as='div' className='prose prose-sm pb-6'>
                          <ul role='list'>
                            {listing.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section> */}
          </div>
        </div>
      </div>
    </div>
  )
}
