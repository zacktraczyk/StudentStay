import React, { useCallback, useRef } from 'react'
import mapboxgl, { Expression } from 'mapbox-gl'
import Map, { Layer, MapRef, Source } from 'react-map-gl'
import useListings from '@/hooks/useListings'

import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

const initialViewState = {
  longitude: -87.6753,
  latitude: 42.0565,
  zoom: 14,
}

const listingLayerStyle = {
  id: 'listing-points',
  type: 'circle' as 'circle',
  paint: {
    'circle-radius': 5,
    'circle-stroke-width': 5,
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#fff',
      '#000',
    ] as Expression,
    'circle-stroke-color': '#000',
  },
}

// const schoolLayerStyle = {
//   id: 'school-points',
//   type: 'circle' as 'circle',
//   paint: {
//     'circle-radius': 5,
//     'circle-stroke-width': 5,
//     'circle-color': [
//       'case',
//       ['boolean', ['feature-state', 'hover'], false],
//       '#fff',
//       '#BE03FC',
//     ] as Expression,
//     'circle-stroke-color': '#BE03FC',
//   },
// }

function ListingsMap() {
  const { data: listings } = useListings()
  // const { data: schools } = useSchools()

  const mapRef = useRef<MapRef>(null)

  const onMapLoad = useCallback(() => {
    // Listing hover
    let listing_id: number | null = null
    if (mapRef.current == null) return

    mapRef.current!.on('mousemove', 'listing-points', (e) => {
      mapRef.current!.getCanvas().style.cursor = 'pointer'

      if (!e.features || e.features!.length === 0) return
      if (listing_id) {
        mapRef.current!.removeFeatureState({
          source: 'listings',
          id: listing_id,
        })
      }

      listing_id = Number(e.features![0].id)

      mapRef.current!.setFeatureState(
        {
          source: 'listings',
          id: listing_id,
        },
        {
          hover: true,
        },
      )
    })

    mapRef.current!.on('mouseleave', 'listing-points', () => {
      if (listing_id !== null) {
        mapRef.current!.setFeatureState(
          {
            source: 'listings',
            id: listing_id,
          },
          {
            hover: false,
          },
        )
      }

      listing_id = null

      mapRef.current!.getCanvas().style.cursor = ''
    })

    // School hover
    //   let schoolID: number | null = null

    //   mapRef.current!.on('mousemove', 'school-points', (e) => {
    //     mapRef.current!.getCanvas().style.cursor = 'pointer'

    //     if (!e.features || e.features!.length === 0) return
    //     if (listing_id) {
    //       mapRef.current!.removeFeatureState({
    //         source: 'schools',
    //         id: listing_id,
    //       })
    //     }

    //     listing_id = Number(e.features![0].id)

    //     mapRef.current!.setFeatureState(
    //       {
    //         source: 'schools',
    //         id: listing_id,
    //       },
    //       {
    //         hover: true,
    //       },
    //     )
    //   })

    //   mapRef.current!.on('mouseleave', 'school-points', () => {
    //     if (listing_id !== null) {
    //       mapRef.current!.setFeatureState(
    //         {
    //           source: 'schools',
    //           id: listing_id,
    //         },
    //         {
    //           hover: false,
    //         },
    //       )
    //     }

    //     listing_id = null

    //     mapRef.current!.getCanvas().style.cursor = ''
    //   })
  }, [])

  return (
    <Map
      id='listingsMap'
      ref={mapRef}
      reuseMaps
      initialViewState={initialViewState}
      onLoad={onMapLoad}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    >
      {listings && (
        <Source id='listings' type='geojson' data={listings} generateId>
          <Layer {...listingLayerStyle} />
        </Source>
      )}
      {/* {schools && (
        <Source id='schools' type='geojson' data={schools} generateId>
          <Layer {...schoolLayerStyle} />
        </Source>
      )} */}
    </Map>
  )
}

export default ListingsMap
