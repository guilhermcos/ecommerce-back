import { Router } from "express";
import checkoutControllers from "../controllers/checkout.controllers.js"
import tokenValidation from "../middlewares/token.validation.js";

const checkoutRoutes = Router()

checkoutRoutes.post("/checkout/address", tokenValidation, checkoutControllers.createAddress)
checkoutRoutes.post("/checkout/payment", tokenValidation, checkoutControllers.createPayment)
checkoutRoutes.get('/checkout', tokenValidation, checkoutControllers.get)

export default checkoutRoutes