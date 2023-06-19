"use client";

import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import Map, { Layer, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/lib/supabaseClient";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

function LocationCreate() {
  const [locationLabel, setLocationLabel] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const location_point = coordToPgisPoint([
        parseFloat(longitude),
        parseFloat(latitude),
      ]);

      const data = {
        label: locationLabel,
        color: "pink",
        location: location_point,
      };

      console.log(data);
      const { error } = await supabase.from("listingsdemo").insert(data);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
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
          <div className="flex flex-col md:flex-row gap-5 mt-2">
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

type listing = {
  listingid: string;
  label: string;
  color: string;
  location: string;
};

interface PropListings {
  listings: FeatureCollection<Geometry, GeoJsonProperties>;
}

function Listings(props: PropListings) {
  const { listings } = props;

  return (
    <div className="flex flex-col items-center gap-5">
      <h1>Listings</h1>
      {listings.features.map((listing, i) => (
        <div key={i} className="border-2 rounded-lg w-full p-3">
          <p>{JSON.stringify(listing)}</p>
        </div>
      ))}
    </div>
  );
}

const pgisPointToCoord = (point: string) => {
  if (!point || point.substring(0, 6) !== "POINT(") {
    console.error("invalid PostGIS Point passed");
  }

  const coords_combined = point.substring(6, point.length - 1);
  const coords = coords_combined.split(" ");

  return [parseFloat(coords[0]), parseFloat(coords[1])];
};

const coordToPgisPoint = (coord: [number, number]) => {
  return `POINT(${coord[0].toFixed(6)} ${coord[1].toFixed(6)})`;
};

interface PropSideMenu {
  listings: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
}

function SideMenu(props: PropSideMenu) {
  const { listings } = props;

  return (
    <div className="p-10 md:p-0 md:w-60 flex flex-col items-stretch">
      <LocationCreate />
      <hr className="h-px bg-gray-200 border-0 my-8" />
      <div className="flex-grow h-fill">
        {listings ? <Listings listings={listings} /> : <p>No listings</p>}
      </div>
    </div>
  );
}

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

function MapTest() {
  const [listings, setListings] =
    useState<FeatureCollection<Geometry, GeoJsonProperties>>();

  useEffect(() => {
    const getListings = async () => {
      const { data, error } = await supabase.rpc("nearby_listings_demo");
      // const { data, error } = await supabase
      //   .from("listings AS t")
      //   .select(
      //     "json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))"
      //   );

      if (error) {
        console.error(error);
        return;
      }

      console.log(data[0].json_build_object);

      setListings(data[0].json_build_object);
    };

    getListings();
  }, []);

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
        <SideMenu listings={listings} />
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
        <Source id="locations" type="geojson" data={listings}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}

export default MapTest;
