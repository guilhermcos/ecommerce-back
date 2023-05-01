import db from "../database/database.js";
import { ObjectId } from "mongodb";

async function create(req, res) {
    const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

    const userFilter = { _id: TEMPORARY_USER_ID };

    try {
        const [orderData] = await db.usersCollection
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
        { $project: { "hashedPassword": 0, "paymentMethod.card.hashNumber": 0 } },
      ])
      .toArray();

      const totalPricePerSku = orderData.cart.map((sku) => ({
        price: sku.price.cents,
        discount: (1 - (sku.price.discount / 100)),
        quantity: sku.quantity,
        totalPricePerSku: ((sku.price.cents * (1 - (sku.price.discount / 100))) * sku.quantity)
      }))

      console.log(orderData.paymentMethod)

      const totalPrice = totalPricePerSku.reduce((acc, curr) => {
        return acc + curr.totalPricePerSku
      }, 0)

      console.log(totalPrice)

      const paymentMethod = orderData.paymentMethod.map((payment) => {
        const {userId, ...rest} = payment
        return rest
    })

      const order = {
        userId: orderData._id,
        paymentStatus: "processed",
        totalPrice: {cents: totalPrice, currency: "USD"},
        paymentMethod,
        shippingAddress: orderData.mainAddress,
        items: orderData.cart
      }

      await db.ordersCollection.insertOne(order)
      await db.usersCollection.updateOne(userFilter, {$set: {cart: []}})

      res.status(200).send(order)
    } catch (err) {
        
    }
}

export default { create }