"use client";

import React, { useEffect, useState } from "react";
import { FeatureCollection, Point, GeoJsonProperties } from "geojson";

import { supabase } from "@/lib/supabaseClient";
import LocationCreate from "./location-create";
import Listings from "./listings";
import ListingsMap from "./listings-map";
import { ViewState } from "react-map-gl";

export type ListingsType = FeatureCollection<Point, GeoJsonProperties>;

const initialViewState = {
  longitude: -122.033,
  latitude: 36.967,
  zoom: 14,
};

function ListingsDemo() {
  const [listings, setListings] = useState<ListingsType>();
  const [viewState, setViewState] =
    useState<Partial<ViewState>>(initialViewState);

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
      <SideMenu listings={listings} setViewState={setViewState} />
      <ListingsMap
        listings={listings}
        viewState={viewState}
        setViewState={setViewState}
      />
    </div>
  );
}

interface PropSideMenu {
  listings: ListingsType | undefined;
  setViewState: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
}

function SideMenu(props: PropSideMenu) {
  const { listings, setViewState } = props;

  return (
    <div className="p-10 flex flex-col items-stretch">
      <LocationCreate />
      <hr className="h-px bg-gray-200 border-0 my-8" />
      <Listings listings={listings} setViewState={setViewState} />
    </div>
  );
}

export default ListingsDemo;
