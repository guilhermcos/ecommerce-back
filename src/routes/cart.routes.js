import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js"
import { validateSchemaParams } from "../middlewares/schema.validation.js";
import cartSchemas from "../schemas/cart.schemas.js"

const cartRoutes = Router()

cartRoutes.post("/cart/:productId", validateSchemaParams(cartSchemas.productId), cartControllers.insert)
cartRoutes.post("/cart/update/:updateCart", validateSchemaParams(cartSchemas.updateCart), cartControllers.update)

export default cartRoutes