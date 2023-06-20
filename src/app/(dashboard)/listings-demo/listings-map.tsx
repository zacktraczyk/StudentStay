import React from "react";
import mapboxgl, { Expression } from "mapbox-gl";
import Map, { Layer, Source } from "react-map-gl";

import { ListingsType } from "./page";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const layerStyle = {
  id: "listing-points",
  type: "circle" as "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": ["get", "color"] as Expression,
  },
};

interface PropListingsMap {
  listings: ListingsType | undefined;
}

function ListingsMap(props: PropListingsMap) {
  const { listings } = props;

  return (
    <Map
      initialViewState={{
        longitude: -122.033,
        latitude: 36.967,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {listings && (
        <Source id="locations" type="geojson" data={listings}>
          <Layer {...layerStyle} />
        </Source>
      )}
    </Map>
  );
}

export default ListingsMap;
