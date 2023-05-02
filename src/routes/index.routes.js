import { Router } from "express";
import authRouter from "./auth.routes.js";
import createRoute from "./CREATEDB.routes.js";
import productRouter from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import checkoutRoutes from "./checkout.routes.js";
import ordersRoutes from "./order.routes.js";

const router = Router();

// Todas as rotas são passadas para que para deixar os uses todos no index
router.use([authRouter, cartRoutes, checkoutRoutes, ordersRoutes]);
//router.use(userRouter);
router.use(productRouter);
router.use(createRoute) // NÃO USAR, NEM APAGAR


//exportadas para ser usado em server.js nas configurações do servidor no express
export default router;
