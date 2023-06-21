"use client";

import React, { useEffect, useState } from "react";
import { ListingsGeojson } from "@/lib/database.types";
import { supabase } from "@/lib/supabaseClient";
import LocationCreate from "./location-create";
import Listings from "./listings";
import ListingsMap from "./listings-map";
import { ViewState } from "react-map-gl";
import Link from "next/link";
import Image from "next/image";

import logo from "../../../../public/logo.svg";

const initialViewState = {
  longitude: -122.033,
  latitude: 36.967,
  zoom: 14,
};

function ListingsDemo() {
  const [listings, setListings] = useState<ListingsGeojson>();
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
    <div className="flex flex-col md:flex-row h-full w-full">
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
  listings: ListingsGeojson | undefined;
  setViewState: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
}

function SideMenu(props: PropSideMenu) {
  const { listings, setViewState } = props;

  return (
    <div className="p-10 flex flex-col items-stretch">
      <div className="flex lg:flex-1 mb-10">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Student Stay</span>
          <Image priority className="h-8 w-auto" src={logo} alt="" />
        </Link>
      </div>
      <LocationCreate />
      <hr className="h-px bg-gray-200 border-0 my-8" />
      <Listings listings={listings} setViewState={setViewState} />
    </div>
  );
}

export default ListingsDemo;
