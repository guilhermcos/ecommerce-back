import joi from "joi";

const productId = joi.object({
  productId: joi
    .string()
    .alphanum()
    .length(24)
    .message("Invalid or missing transaction id")
    .required(),
});

const updateCart = joi.object({
  updateCart: joi.string().valid("increase", "decrease").optional(),
});

export default { productId, updateCart };
