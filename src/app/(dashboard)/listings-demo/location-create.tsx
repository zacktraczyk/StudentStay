import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const coordToPgisPoint = (coord: [number, number]) => {
  return `POINT(${coord[0].toFixed(6)} ${coord[1].toFixed(6)})`;
};

export default function LocationCreate() {
  const [locationLabel, setLocationLabel] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const locationPoint = coordToPgisPoint([
        parseFloat(longitude),
        parseFloat(latitude),
      ]);

      const data = {
        label: locationLabel,
        color: color,
        location: locationPoint,
      };

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

      <div>
        <label
          htmlFor="colorpicker"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Color
        </label>

        <input
          type="color"
          name="colorpicker"
          id="colorpicker"
          className="block w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
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
