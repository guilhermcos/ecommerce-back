import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();


// Todas as rotas são passadas para que para deixar os uses todos no index
router.use(authRouter);
//router.use(userRouter);

//exportadas para ser usado em server.js nas configurações do servidor no express
export default router;