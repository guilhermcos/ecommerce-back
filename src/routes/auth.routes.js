import { Router } from "express";
import authSchemas from "../schemas/auth.schemas.js"; //importação de objeto que vai conter schemas de auth
import AuthValidations from "../middlewares/auth.validations.js";
import AuthControllers from "../controllers/auth.controllers.js";
import { validateSchemaBody } from "../middlewares/schema.validation.js";

const authValidations = new AuthValidations(); // Padrão para importar e usar as funções
const authControllers = new AuthControllers(); // Padrão para importar e usar funções

const authRouter = Router();

authRouter.post(
  "/auth/sign-up",
  validateSchemaBody(authSchemas.schemaSignUp),
  authValidations.validateSignUp,
  authControllers.signUp
);
authRouter.post(
  "/auth/sign-in",
  validateSchemaBody(authSchemas.schemaSignIn),
  authValidations.validateSignIn,
  authControllers.signIn
);

// exportando para unir todas no index.routes.js
export default authRouter;
