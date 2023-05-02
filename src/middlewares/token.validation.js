import database from "../database/database.js";
const { sessionsCollection } = database;

export default async function tokenValidation(req, res, next) {
  const reqToken = req.headers.authorization?.replace("Bearer ", "");
  if (!reqToken) return res.sendStatus(401);
  try {
    const session = await sessionsCollection.findOne({ token: reqToken });
    if (!session) return res.sendStatus(401);

    res.locals.userId = session.userId;

    console.log(session)

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
