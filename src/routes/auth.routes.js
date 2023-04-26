import { Router } from "express";
import authSchemas from "../schemas/auth.schemas.js"; //importação de objeto que vai conter schemas de auth
import AuthValidations from "../middlewares/auth.validations.js";
import AuthControllers from "../controllers/auth.controllers.js";
import schemaValidate from "../middlewares/schema.validation.js";

const authValidations = new AuthValidations(); // Padrão para importar e usar as funções
const authControllers = new AuthControllers(); // Padrão para importar e usar funções

const authRouter = Router();

authRouter.post(
  "/auth/signUp", // rota
  //schemaValidate(authSchemas.schemaSignUp), //validação do schema, passa o schema como parametro
  authValidations.validateSignUp, //validação "regras de negócio"...
  authControllers.signUp //função para fazer o que tem q ser feito
);

// exportando para unir todas no index.routes.js
export default authRouter;
