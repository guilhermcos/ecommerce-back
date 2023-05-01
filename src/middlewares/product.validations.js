import productSchemas from "../schemas/product.schemas.js";

export default class ProductValidations {
  async validateGetCatalog(req, res, next) {
    try {
      await productSchemas.schemaGetCatalog.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }

  async validateGetProduct(req, res, next) {
    try {
      await productSchemas.schemaGetProduct.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }

  async validateAddToCart(req, res, next) {
    try {
      await productSchemas.schemaAddToCart.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
}
