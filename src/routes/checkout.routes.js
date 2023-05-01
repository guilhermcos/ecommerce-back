import { Router } from "express";
import checkoutControllers from "../controllers/checkout.controllers.js"

const checkoutRoutes = Router()

checkoutRoutes.post("/checkout/address", checkoutControllers.createAddress)
checkoutRoutes.post("/checkout/payment", checkoutControllers.createPayment)
checkoutRoutes.get('/checkout', checkoutControllers.get)

export default checkoutRoutes