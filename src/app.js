import dotenv from "dotenv";
import { connectServer } from "./server/server.js";
import { connectDataBase, getDataBase } from "./database/database.js";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT,
};
const dataBaseConfig = {
  MONGO_URI: process.env.MONGO_URI,
};
try {
  await connectDataBase(dataBaseConfig);
  const db = getDataBase();
  const app = connectServer(serverConfig);
} catch (err) {
  console.log(err);
}
