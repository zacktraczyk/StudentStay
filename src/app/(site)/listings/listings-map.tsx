import React, { useRef } from 'react'
import mapboxgl, { Expression } from 'mapbox-gl'
import Map, { Layer, MapRef, Source } from 'react-map-gl'
import useListings from '@/hooks/useListings'

import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

const initialViewState = {
  longitude: -122.033,
  latitude: 36.967,
  zoom: 14,
}

const layerStyle = {
  id: 'listing-points',
  type: 'circle' as 'circle',
  paint: {
    'circle-radius': 5,
    'circle-stroke-width': 5,
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#fff',
      ['get', 'color'],
    ] as Expression,
    'circle-stroke-color': ['get', 'color'] as Expression,
  },
}

function ListingsMap() {
  const { data: listings } = useListings()
  const mapRef = useRef<MapRef>(null)

  const onMapLoad = React.useCallback(() => {
    let listingID: number | null = null
    mapRef.current!.on('mousemove', 'listing-points', (e) => {
      mapRef.current!.getCanvas().style.cursor = 'pointer'

      if (!e.features || e.features!.length === 0) return

      if (listingID) {
        mapRef.current!.removeFeatureState({
          source: 'locations',
          id: listingID,
        })
      }

      listingID = Number(e.features![0].id)

      mapRef.current!.setFeatureState(
        {
          source: 'locations',
          id: listingID,
        },
        {
          hover: true,
        },
      )
    })

    mapRef.current!.on('mouseleave', 'listing-points', () => {
      if (listingID !== null) {
        mapRef.current!.setFeatureState(
          {
            source: 'locations',
            id: listingID,
          },
          {
            hover: false,
          },
        )
      }

      listingID = null
      mapRef.current!.getCanvas().style.cursor = ''
    })
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
        <Source id='locations' type='geojson' data={listings} generateId>
          <Layer {...layerStyle} />
        </Source>
      )}
    </Map>
  )
}

export default ListingsMap
