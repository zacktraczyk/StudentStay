"use client";

import React, { useEffect, useState } from "react";
import { ListingsGeojson } from "@/lib/database.types";
import LocationCreate from "./listings-create";
import Listings from "./listings";
import ListingsMap from "./listings-map";
import { MapProvider } from "react-map-gl";
import Link from "next/link";
import Image from "next/image";

import logo from "../../../../public/logo.svg";

function ListingsDemo() {
  return (
    <div className="h-[100em] flex flex-col md:flex-row md:h-full w-full">
      <MapProvider>
        <SideMenu />
        <ListingsMap />
      </MapProvider>
    </div>
  );
}

function SideMenu() {
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
      <Listings />
    </div>
  );
}

export default ListingsDemo;
