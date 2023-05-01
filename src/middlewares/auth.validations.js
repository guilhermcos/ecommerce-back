import database from "../database/database.js";
const { usersCollection } = database;
import bcrypt from "bcrypt";

export default class AuthValidations {
  async validateSignUp(req, res, next) {
    const { email } = req.body;
    try {
      const user = await usersCollection.findOne({ email });
      if (user) return res.status(409).send("E-mail already registered.");
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async validateSignIn(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await usersCollection.findOne({ email });
      if (!user) return res.status(404).send("E-mail not registered");

      const comparePassword = bcrypt.compareSync(password, user.hashedPassword);
      if (!comparePassword) return res.status(401).send("Password incorrect");

      res.locals.user = user;
      next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}
