import Joi from "joi";

const productSchemas = {
  schemaGetCatalog: Joi.object({
    gender: Joi.string().valid("women", "men").required(),
    category: Joi.string().min(1).required(),
  }).unknown(true),
  schemaGetProduct: Joi.object({
    id: Joi.string().min(1).required(),
  }).unknown(true),
  schemaAddToCart: Joi.object({
    id: Joi.string().min(1).required(),
  }),
};

export default productSchemas;
