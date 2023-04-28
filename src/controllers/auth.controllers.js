import { usersCollection, sessionCollection }  from "../database/database"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export default class AuthControllers {
  async signUp(req, res) {
    const {name, email, password} = req.body
    
    try {

      const user = await usersCollection.findOne({ email })
      if (user) return res.status(509).send("Email já cadastrado")

      const hashPassword = bcrypt.hashSync(password, 10)
      await usersCollection.insertOne({name, email, password: hashPassword})

      res.sendStatus(201)
    } catch (error) {
      return res.sendStatus(500)
    }
    
  }

  async signIn(req, res) {
    const { email, password } = req.body
    try {
      const user = await usersCollection.findOne({ email })
      if(!user) return res.status(404).send("Email not registered")

      const comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) return res.status(401).send("Password incorrect")

      const token = uuid()
      await sessionCollection.insertOne({ userId: user._id, token})

      res.status(201).send({ token })
    } catch (error) {
      return res.sendStatus(500)
    }

  }
}
