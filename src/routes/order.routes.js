import { Router } from "express";
import ordersControllers from "../controllers/orders.controllers.js"
import tokenValidation from "../middlewares/token.validation.js";

const ordersRoutes = Router()

ordersRoutes.post("/orders", tokenValidation, ordersControllers.create)


export default ordersRoutes