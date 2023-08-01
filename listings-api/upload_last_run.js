import { createClient } from "@supabase/supabase-js";
import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
dotenv.config();

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

// Initialize the Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

// Prepare Actor input
// const input = {
//     "zipCodes": [
//         "60201"
//     ],
//     // "priceMax": 400000,
//     "forSaleIncludeComingSoon": false,
//     "daysOnZillow": "",
//     "forSaleByAgent": true,
//     "forSaleByOwner": false,
//     "forRent": false,
//     "sold": false,
//     "debugLog": false
// };

(async () => {
  // Run the Actor and wait for it to finish
  // const run = await client.actor("RvayEnDfmhqrvMcPL/l7auNT3I30CssRrvO").call(input);

  // Fetch and print actor results from the run's dataset (if any)
  //   console.log("Results from dataset");
  //   const { items } = await client.dataset(run.defaultDatasetId).listItems();
  //   items.forEach((item) => {
  //     console.dir(item);
  //   });

  // Print last actor run results from the default dataset (if any)
  const actorClient = client.actor("maxcopell/zillow-zip-search");
  const lastSuccessfulRun = actorClient.lastRun({ status: "SUCCEEDED" });
  const { items } = await lastSuccessfulRun.dataset().listItems();

  // NOTE: Use Postgresql COPY for large datasets
  console.log("Uploading Dataset To Supabase");

  items.forEach(async (item) => {
    if (item.isBuilding) {
      return;
    }

    const payload = {
      listing_type: "RENTAL",
      status: item.statusType,

      building_name: item.buildingName,

      address_full: item.address,
      address_city: item.addressCity,
      address_street: item.addressStreet,
      address_state: item.addressState,
      address_zipcode: item.addressZipcode,
      location:
        "POINT(" + item.latLong.longitude + " " + item.latLong.latitude + ")",

      square_footage: item.area,
      baths: item.baths,
      beds: item.beds,

      preview_img_src: item.imgSrc,
      //   additional_img_srcs: TODO

      ranged_price: false,
      price: item.unformattedPrice,

      listing_source: "Zillow",
      listing_source_id: item.zpid,
      listing_source_detail_url: item.detailUrl,
    };

    const { data, error } = await supabase.from("listings").insert(payload);

    if (error) {
      console.log(error);
      console.log(payload);
      throw error;
    }
  });
})();
