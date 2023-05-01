import { Router } from "express";
import ProductControllers from "../controllers/product.controllers.js";
import ProductValidations from "../middlewares/product.validations.js";

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
productRouter.post(
  "product/cart/:id",
  productValidations.validateAddToCart,
  productControllers.addToCart
);

export default productRouter;
