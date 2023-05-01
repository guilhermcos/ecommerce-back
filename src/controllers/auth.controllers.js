import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import database from "../database/database.js";
const { usersCollection, sessionsCollection } = database;

export default class AuthControllers {
  async signUp(req, res) {
    const user = req.body;
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = {
      name: user.name,
      email: user.email,
      hashedPassword: hashedPassword,
      mainAddress: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        postalCode: "",
      },
      cart: [],
    };

    try {
      await usersCollection.insertOne(newUser);
      res.sendStatus(201);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async signIn(req, res) {
    const user = res.locals.user;
    try {
      const token = uuid();
      await sessionsCollection.insertOne({ userId: user._id, token });

      res.status(201).send({ token });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}
