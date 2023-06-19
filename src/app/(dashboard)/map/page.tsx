"use client";

import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import Map, { Layer, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/lib/supabaseClient";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: "FeatureCollection" as "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.03371, 36.96719],
      },
      properties: {
        name: "142 Walti",
      },
    },
  ],
};

const layerStyle = {
  id: "listing-points",
  type: "circle" as "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#007cbf",
      "#000",
    ],
  },
};

function LocationCreate() {
  const [locationLabel, setLocationLabel] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = {
      label: locationLabel,
      coords: [longitude, latitude],
    };

    console.log(data);
    // const {error} = await supabase.from('listings').insert(
    //   {}
    // )
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="locationLabel"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Location Label
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="locationLabel"
            id="locationLabel"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            placeholder="Test Location"
            value={locationLabel}
            onChange={(e) => setLocationLabel(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Coordinates
          </label>
          <div className="flex gap-5 mt-2">
            <input
              type="number"
              name="longitude"
              id="longitude"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
            <input
              type="number"
              name="latitude"
              id="latitude"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
      >
        Submit
      </button>
    </form>
  );
}

const listings = [
  {
    gid: "0",
    label: "test",
    color: "pink",
    location: "POINT(-73.94581 40.807475)",
  },
];

function Listings() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1>Listings</h1>
      {listings.map((listing) => (
        <div id={listing.gid} className="border-2 rounded-lg w-full p-3">
          <p>GID: {listing.gid}</p>
          <p>Label: {listing.label}</p>
          <p>Color: {listing.color}</p>
          <p>Location:</p>
          <p>{listing.location}</p>
        </div>
      ))}
    </div>
  );
}

function SideMenu() {
  return (
    <div className="p-10 md:p-0 md:w-60 flex flex-col items-stretch">
      <LocationCreate />
      <hr className="h-px bg-gray-200 border-0 my-8" />
      <div className="flex-grow h-fill">
        <Listings />
      </div>
    </div>
  );
}

function MapTest() {
  // const onMapHover = React.useCallback(() => {
  //   mapRef.current.on("hover", () => {});
  // }, []);

  // const onMapLeave = React.useCallback(() => {
  //   mapRef.current.on("mouseleave", () => {
  //     HoverPointID = null;
  //     map.getCanvas;
  //   });
  // }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-2/3 h-full flex items-center justify-center">
        <SideMenu />
      </div>
      <Map
        // onMouseEnter={onMapHover}
        // onMouseLeave={onMapLeave}
        initialViewState={{
          longitude: -122.033,
          latitude: 36.967,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="locations" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}

export default MapTest;
