import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js"
import { validateSchemaParams, validateSchemaQuery } from "../middlewares/schema.validation.js";
import cartSchemas from "../schemas/cart.schemas.js"

const cartRoutes = Router()

cartRoutes.post("/cart/:productId", validateSchemaParams(cartSchemas.productId), validateSchemaQuery(cartSchemas.updateCart) ,cartControllers.insert)
cartRoutes.get("/cart", cartControllers.get)

export default cartRoutes