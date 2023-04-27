import express from "express";
import cors from "cors";
import router from "../routes/index.routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000

//Função que inicia o servidor
export function connectServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
  return app;
}
