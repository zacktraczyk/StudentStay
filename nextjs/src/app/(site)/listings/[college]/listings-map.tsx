'use client'

import React, { useCallback, useState } from 'react'
import mapboxgl, { Expression } from 'mapbox-gl'
import Map, { Layer, MapRef, Source, useMap } from 'react-map-gl'
import useListings from '@/hooks/useListings'
import { FeatureCollection, Point, GeoJsonProperties } from 'geojson'
import { useSupabase } from '@/app/supabase-provider'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
    'circle-radius': 3,
    'circle-stroke-width': 4,
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#fff',
      '#000',
    ] as Expression,
    'circle-stroke-color': '#000',
  },
}

const schoolLayerStyle = {
  id: 'school-points',
  type: 'symbol' as 'symbol',
  layout: {
    'icon-image': 'school-logo',
    'icon-size': 0.04,
  },
}

export default function ListingsMap() {
  const { data: listings } = useListings()

  const { supabase, session } = useSupabase()
  const pathname = usePathname()
  const school_slug = pathname.split('/')[2]

  const [school, setSchool] = useState<FeatureCollection<Point, GeoJsonProperties>>()

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref == null) return

    const map = ref
    // Listing hover
    let listing_id: number | null = null

    map.on('mousemove', 'listing-points', (e) => {
      map.getCanvas().style.cursor = 'pointer'

      if (!e.features || e.features!.length === 0) return
      if (listing_id) {
        console.log('listing_id: ', listing_id)
        map.removeFeatureState({
          source: 'listings',
          id: listing_id,
        })
      }

      listing_id = Number(e.features![0].id)

      map.setFeatureState(
        {
          source: 'listings',
          id: listing_id,
        },
        {
          hover: true,
        },
      )
    })

    map.on('mouseleave', 'listing-points', () => {
      if (listing_id !== null) {
        map.setFeatureState(
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

      map.getCanvas().style.cursor = ''
    })

    // School Image
    // if (map.hasImage('school-logo')) return
    // // console.log('loadImage', school.features[0].properties.logo_img_src)
    // if (!school || school.features[0].properties.logo_img_src.length < 3) return

    // console.log('loadImage', school.features[0].properties.logo_img_src)

    // map.loadImage(school.features[0].properties.logo_img_src, (error, image) => {
    //   if (error) throw error
    //   if (!map.hasImage('school-logo')) {
    //     map.addImage('school-logo', image!, { sdf: true })
    //   }
    // })
  }, [])

  useEffect(() => {
    const getSchool = async () => {
      const { data: _school, error } = await supabase.rpc('school_with_geojson', {
        selected_school_slug: school_slug,
      })

      if (error) {
        console.error(error)
        return
      }

      setSchool(_school as any as FeatureCollection<Point, GeoJsonProperties>)
    }

    getSchool()
  }, [session?.user.id, supabase, school_slug])

  return (
    <Map
      id='listingsMap'
      ref={mapRefCallback}
      initialViewState={initialViewState}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      reuseMaps
    >
      {listings && (
        <Source id='listings' type='geojson' data={listings} generateId>
          <Layer {...listingLayerStyle} />
        </Source>
      )}
      {school && (
        <Source id='school' type='geojson' data={school} generateId>
          <Layer {...schoolLayerStyle} />
        </Source>
      )}
    </Map>
  )
}
