import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js"
import { validateSchemaParams, validateSchemaQuery } from "../middlewares/schema.validation.js";
import cartSchemas from "../schemas/cart.schemas.js"
import tokenValidation from "../middlewares/token.validation.js";

const cartRoutes = Router()

cartRoutes.post("/cart/:productId", tokenValidation, validateSchemaParams(cartSchemas.productId), validateSchemaQuery(cartSchemas.updateCart) ,cartControllers.insert)
cartRoutes.get("/cart", tokenValidation, cartControllers.get)

export default cartRoutes