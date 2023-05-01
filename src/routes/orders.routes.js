import { Router } from "express";
import ordersControllers from "../controllers/orders.controllers.js"

const ordersRoutes = Router()

ordersRoutes.post("/orders", ordersControllers.create)


export default ordersRoutes