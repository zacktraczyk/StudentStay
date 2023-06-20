import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson";

interface PropListings {
  listings: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
}

export default function Listings(props: PropListings) {
  const { listings } = props;

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll">
      <h1>Listings</h1>
      {listings &&
        listings.features &&
        listings.features.map((listing, i) => (
          <Listing key={i} listing={listing} />
        ))}
    </div>
  );
}

interface PropListing {
  listing: Feature<Geometry, GeoJsonProperties>;
}

function Listing(props: PropListing) {
  const { listing } = props;
  const listingid = listing.properties?.listingid || "";
  const label = listing.properties?.label || "";
  const color = listing.properties?.color || "";

  return (
    <div
      className={`border-2 rounded-lg w-full p-3`}
      style={{ borderColor: color }}
    >
      <p>ID: {listingid}</p>
      <p>Label: {label}</p>
    </div>
  );
}
