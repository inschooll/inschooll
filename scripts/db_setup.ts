import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { countries_data } from "./data/countries_data";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

const insertCountries = async () => {
  // 1. don't run if countries have already been added
  const dbCountries = await db.query.country.findMany();
  if (dbCountries.length > 0) {
    return console.log(`${dbCountries.length} Countries already exist! ✅`);
  }

  // 2. add countries
  console.log("Inserting Countries... 🚀");
  const countries = countries_data.map((country) => {
    return {
      id: randomUUID(),
      name: country.name,
      iso3: country.iso3,
      iso2: country.iso2,
      dialingCode1: country.dialing_code_1,
      dialingCode2: country.dialing_code_2,
      dialingCode3: country.dialing_code_3,
    };
  });
  await db.insert(schema.country).values(countries);
  console.log("Insertion Completed ✅✅");
};

const insertStates = async () => {
  // 1. don't run if countries have already been added
  const dbStates = await db.query.state.findMany();
  if (dbStates.length > 0) {
    return console.log(`${dbStates.length} States already exist! ✅`);
  }

  // 2. add states
  console.log("Inserting States... 🚀");
  countries_data.map(async (country) => {
    const dbCountry = await db.query.country.findFirst({
      where: () => eq(schema.country.name, country.name),
    });
    if (!dbCountry?.id)
      console.log("Country for states insertion wasn't found. 🥸");
    
    // console.log("Country found");
    const states = country.states.map((state) => {
      return {
        id: randomUUID(),
        name: state.name,
        statusCode: state.state_code,
        country_id: dbCountry?.id ?? "",
      };
    });

    if (states.length == 0) return;
    await db.insert(schema.state).values(states);
  });

  console.log("Insertion Completed ✅✅");
};

await insertCountries();
await insertStates();
