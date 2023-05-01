import { usersCollection, sessionCollection }  from "../database/database"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export default class AuthControllers {
  async signUp(req, res) {
    
    const user = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    
    try {
      await usersCollection.insertOne({...user, password: hashPassword})

      res.sendStatus(201)
    } catch (error) {
      return res.sendStatus(500)
    }
    
  }

  async signIn(req, res) {
    
    const user = res.locals.user;
    try {

      const token = uuid()
      await sessionCollection.insertOne({ userId: user._id, token})

      res.status(201).send({ token })
    } catch (error) {
      return res.sendStatus(500)
    }

  }
}
