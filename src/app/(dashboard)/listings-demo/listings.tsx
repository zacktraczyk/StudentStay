import useListings from "@/hooks/useListings";
import { Feature, Point, GeoJsonProperties } from "geojson";
import { useMap } from "react-map-gl";

export default function Listings() {
  const { data: listings } = useListings();

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll h-60 md:h-full">
      <h1 className="w-full">Listings</h1>
      {listings &&
        listings.features &&
        listings.features.map((listing, i) => (
          <Listing key={i} listing={listing} />
        ))}
    </div>
  );
}

interface PropListing {
  listing: Feature<Point, GeoJsonProperties>;
}

function Listing(props: PropListing) {
  const { listing } = props;
  const { listingsMap } = useMap();

  const listingid = listing.properties?.listingid || "";
  const label = listing.properties?.label || "";
  const color = listing.properties?.color || "";

  const handleClick = () => {
    console;
    listingsMap?.flyTo({
      center: listing.geometry.coordinates as [number, number],
    });
  };

  return (
    <div
      className="border-2 rounded-lg w-full p-3 hover:bg-gray-100"
      style={{ borderColor: color }}
      onClick={handleClick}
    >
      <p>ID: {listingid}</p>
      <p>Label: {label}</p>
    </div>
  );
}
