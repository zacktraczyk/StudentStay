import { Feature, Point, GeoJsonProperties } from "geojson";
import { ListingsType } from "./page";
import { ViewState } from "react-map-gl";

interface PropListings {
  listings: ListingsType | undefined;
  setViewState: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
}

export default function Listings(props: PropListings) {
  const { listings, setViewState } = props;

  return (
    <div className="flex flex-col items-center gap-5 overflow-y-scroll">
      <h1>Listings</h1>
      {listings &&
        listings.features &&
        listings.features.map((listing, i) => (
          <Listing key={i} listing={listing} setViewState={setViewState} />
        ))}
    </div>
  );
}

interface PropListing {
  listing: Feature<Point, GeoJsonProperties>;
  setViewState: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
}

function Listing(props: PropListing) {
  const { listing, setViewState } = props;
  const listingid = listing.properties?.listingid || "";
  const label = listing.properties?.label || "";
  const color = listing.properties?.color || "";

  const handleClick = () => {
    const [longitude, latitude] = listing.geometry.coordinates;
    const view = {
      longitude,
      latitude,
    };
    setViewState(view);
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
