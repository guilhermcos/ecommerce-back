import database from "../database/database.js";
const { sessionsCollection } = database;

export default function tokenValidation(req, res, next) {
  const reqToken = req.headers.authorization?.replace("Bearer ", "");
  if (!reqToken) return res.sendStatus(401);
  try {
    const session = sessionsCollection.findOne({ token: reqToken });
    if (!session) return res.sendStatus(401);
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
