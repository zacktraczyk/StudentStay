import React from "react";
import mapboxgl, { Expression } from "mapbox-gl";
import Map, { Layer, Source, ViewState } from "react-map-gl";
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
  viewState: Partial<ViewState>;
  setViewState: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
}

function ListingsMap(props: PropListingsMap) {
  const { listings, viewState, setViewState } = props;

  return (
    <Map
      {...viewState}
      onMove={(e) => setViewState(e.viewState)}
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
