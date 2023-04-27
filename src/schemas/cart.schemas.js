import joi from "joi";

const objectId = joi.object({
  productId: joi
    .string()
    .alphanum()
    .length(24)
    .message("Invalid or missing transaction id")
    .required(),
});

export default { objectId }