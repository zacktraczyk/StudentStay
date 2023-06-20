"use client";

import React, { useEffect, useState } from "react";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

import { supabase } from "@/lib/supabaseClient";
import LocationCreate from "./location-create";
import Listings from "./listings";
import ListingsMap from "./listings-map";

export type ListingsType = FeatureCollection<Geometry, GeoJsonProperties>;

function ListingsDemo() {
  const [listings, setListings] = useState<ListingsType>();

  useEffect(() => {
    const getListings = async () => {
      const { data, error } = await supabase.rpc("nearby_listings_demo");

      if (error) {
        console.error(error);
        return;
      }

      setListings(data[0].json_build_object);
    };

    getListings();
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideMenu listings={listings} />
      <ListingsMap listings={listings} />
    </div>
  );
}

interface PropSideMenu {
  listings: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
}

function SideMenu(props: PropSideMenu) {
  const { listings } = props;

  return (
    <div className="p-10 flex flex-col items-stretch">
      <LocationCreate />
      <hr className="h-px bg-gray-200 border-0 my-8" />
      <Listings listings={listings} />
    </div>
  );
}

export default ListingsDemo;
