import { Router } from "express";

const createRoute = Router()

createRoute.post("/cart/:productId", cartController.insert)

export default createRoute