import { IncomingMessage, ServerResponse } from "http";
import Database from "../../../database/db";

const allProductTypes = async (req: IncomingMessage, res: ServerResponse) => {
  const db = new Database();
  const allEntries = await db.getAll();
  const length = allEntries.length;

  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify({ data: allEntries, length: length }));
};

export default allProductTypes;
