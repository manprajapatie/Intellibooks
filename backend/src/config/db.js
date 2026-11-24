import "dotenv/config";
import fs from "node:fs";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

const contractJson = JSON.parse(
  fs.readFileSync(
    new URL("../prisma/contract.json", import.meta.url),
    "utf8"
  )
);

const contract = contractFromJson(contractJson);

const db = postgres({
  contract,
  url: process.env.DATABASE_URL,
});

export default db;