import useListings from '@/hooks/useListings'
import { Feature, Point, GeoJsonProperties } from 'geojson'
import { useMap } from 'react-map-gl'

export default function Listings() {
    const { data: listings, isLoading, isError } = useListings()

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
        <div className='flex h-60 flex-col items-center gap-5 overflow-y-scroll md:h-full'>
            <h1 className='w-full'>Listings</h1>
            {listings &&
                listings.features &&
                listings.features.map((listing, i) => <Listing key={i} listing={listing} />)}
        </div>
    )
}

interface PropListing {
    listing: Feature<Point, GeoJsonProperties>
}

function Listing(props: PropListing) {
    const { listing } = props
    const { listingsMap } = useMap()

    const label = listing.properties?.label || 'NA'
    const color = listing.properties?.color || '#FFFFFF'

    const handleClick = () => {
        listingsMap?.flyTo({
            center: listing.geometry.coordinates as [number, number],
        })
    }

    return (
        <div
            className='w-full rounded-lg border-2 p-3 hover:bg-gray-100'
            style={{ borderColor: color }}
            onClick={handleClick}
        >
            <p className='w-full text-center'>{label}</p>
        </div>
    )
}
