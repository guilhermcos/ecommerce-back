import express from "express";
import cors from "cors";
import router from "../routes/index.routes.js";


//Função que inicia o servidor
export function connectServer(serverConfig) {
  const { PORT } = serverConfig;
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
  return app;
}
