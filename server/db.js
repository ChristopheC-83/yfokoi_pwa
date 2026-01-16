import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

// Cette fonction sera appelée par ton API, pas par React !
export async function getData() {
  const result = await sql`SELECT NOW()`;
  return result;
}
