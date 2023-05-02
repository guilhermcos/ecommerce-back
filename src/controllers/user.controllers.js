import database from "../database/database.js";
const { sessionsCollection, usersCollection } = database;

export default async function getUserInfo(req, res) {
  const reqToken = req.headers.authorization?.replace("Bearer ", "");
  try {
    const session = await sessionsCollection.findOne({ token: reqToken });
    if (!session) return res.status(404).send("session not found");
    const user = await usersCollection.findOne({ _id: session.userId });
    if (!user) return res.status(404).send("user not found");
    const firstName = user.name.split(" ")[0];
    const userName =
      firstName[0].toUpperCase() + firstName.toLowerCase().slice(1);
    const info = {
      name: userName,
      email: user.email,
    };
    res.status(200).send(info);
  } catch (err) {
    res.sendStatus(500);
  }
}
