// Funções de validação referente a Auth



export default class AuthValidations {
  async validateSignUp(req, res, next) {

    const { email } = req.body
    try {
       const usuario= await usersCollection.findOne({ email })
      if(usuario) return res.status(409).send("Email já cadastrado")

    } catch (error) {
      
    }
    next();

  }

  async validateSignIn(req, res, next) {
    const { email, password } = req.body

    try {

      const user = await usersCollection.findOne({ email })
      if(!user) return res.status(404).send("Email not registered")

      const comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) return res.status(401).send("Password incorrect")
      
      res.locals.user = user;
    } catch (error) {
      return res.sendStatus(500);
    }

    next();
  }
}