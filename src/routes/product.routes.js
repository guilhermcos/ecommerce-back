import { Router } from "express";
import ProductControllers from "../controllers/product.controllers.js";
import ProductValidations from "../middlewares/product.validations.js";
import tokenValidation from "../middlewares/token.validation.js";

const productControllers = new ProductControllers();
const productValidations = new ProductValidations();

const productRouter = Router();

productRouter.get(
  "/product/catalog/:gender/:category",
  productValidations.validateGetCatalog,
  productControllers.getCatalog
);
productRouter.get(
  "/product/details/:id",
  productValidations.validateGetProduct,
  productControllers.getProduct
);

export default productRouter;
