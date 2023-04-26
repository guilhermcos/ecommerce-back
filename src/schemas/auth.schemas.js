import Joi from "joi";


//Objeto que contém os schemas prontos referentes a Auth
const authSchemas = {
  schemaSignUp: Joi.string()//Joi.object(....),

  //schemaSignIn: Joi.object(...)
};

export default authSchemas;