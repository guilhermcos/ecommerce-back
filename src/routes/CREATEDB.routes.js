import { Router } from "express";
import createDB from "../database/createDB.js";

const createRoute = Router()

createRoute.post("/createproduct", createDB.createProduct)
createRoute.post("/createuser", createDB.createUser)

export default createRoute