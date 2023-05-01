import Joi from "joi";

//Objeto que contém os schemas prontos referentes a Auth
const authSchemas = {
  schemaSignUp: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }).unknown(true),

  schemaSignIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }).unknown(true),
};

export default authSchemas;
