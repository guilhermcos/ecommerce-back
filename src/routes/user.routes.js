import { Router } from "express";
import createDB from "../database/createDB.js";

const createRoute = Router()

createRoute.post("/product", createDB.createProduct)
createRoute.post("/user", createDB.createUser)

export default createRoute