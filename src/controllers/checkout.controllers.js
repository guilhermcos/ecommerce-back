import db from "../database/database.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function createAddress(req, res) {
  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

  const userFilter = { _id: TEMPORARY_USER_ID };

  const address = req.body;

  try {
    const { value: updateUser } = await db.usersCollection.findOneAndUpdate(
      userFilter,
      { $set: { mainAddress: address } },
      { returnDocument: "after", projection: { hashedPassword: 0 } }
    );

    return res.status(200).send(updateUser);
  } catch (err) {
    console.log(err);
  }
}

async function createPayment(req, res) {
  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

  const userFilter = { _id: TEMPORARY_USER_ID };

  const { type, holderName, number, expiryMonth, expiryYear, cvv } = req.body;

  const lastFourNumbers = number.slice(-4);

  const hashNumber = bcrypt.hashSync(number, 10);

  try {
    const paymentMethod = {
      userId: TEMPORARY_USER_ID,
      method: "Credit",
      status: "Verified",
      card: {
        type,
        holderName,
        hashNumber,
        lastFourNumbers,
        expiryMonth,
        expiryYear,
        cvvVerified: true,
      },
    };

    await db.paymentsCollection.insertOne(paymentMethod);

    return res.status(200).send("Payment Method Created");
  } catch (err) {
    console.log(err);
  }
}

async function get(req, res) {
  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

  const userFilter = { _id: TEMPORARY_USER_ID };

  try {
    const checkoutData = await db.usersCollection
      .aggregate([
        { $match: userFilter },
        {
          $lookup: {
            from: "payments",
            localField: "_id",
            foreignField: "userId",
            as: "paymentMethod",
          },
        },
        { $project: { "hashedPassword": 0, "cart": 0, "paymentMethod.card.hashNumber": 0 } },
      ])
      .toArray();

    res.status(200).send(checkoutData);
  } catch (err) {
    console.log(err);
  }
}

export default { createAddress, createPayment, get };
