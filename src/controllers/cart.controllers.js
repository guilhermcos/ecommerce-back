import { ObjectId } from "mongodb";
import db from "../database/database.js";

async function insert(req, res) {
  const { productId } = req.params;
  const { updateCart } = req.query;

  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

  const userFilter = { _id: TEMPORARY_USER_ID };

  const objectId = new ObjectId(productId);

  const productFilter = { "skus._id": objectId };

  try {
    const { title, color, price, skus } = await db.productsCollection.findOne(
      productFilter,
      {
        projection: { title: 1, color: 1, price: 1, "skus.$": 1, _id: 0 },
      }
    );

    const [sku] = skus;

    if (!updateCart || updateCart === "increase") {
      if (sku.stock <= 0)
        return res
          .status(404)
          .send(
            "Sorry, the product you are looking for is currently out of stock"
          );

      await db.productsCollection.updateOne(productFilter, {
        $inc: { "skus.$.stock": -1 },
      });

      const { value: productAlreadyInCart } =
        await db.usersCollection.findOneAndUpdate(
          { _id: TEMPORARY_USER_ID, "cart.productId": objectId },
          { $inc: { "cart.$.quantity": 1 } },
          { returnDocument: "after", projection: { hashedPassword: 0 } }
        );

      if (!productAlreadyInCart) {
        const productToCart = {
          productId: objectId,
          title,
          color,
          price,
          size: sku.size,
          quantity: 1,
        };

        const { value: addProductCart } =
          await db.usersCollection.findOneAndUpdate(
            userFilter,
            { $push: { cart: productToCart } },
            { returnDocument: "after", projection: { hashedPassword: 0 } }
          );

        const { cart } = addProductCart;

        return res.status(200).send(cart);
      }

      const { cart } = productAlreadyInCart;

      return res.status(200).send(cart);
    }

    if (updateCart === "decrease") {
      const { value } = await db.usersCollection.findOneAndUpdate(
        { _id: TEMPORARY_USER_ID, "cart.productId": objectId },
        { $inc: { "cart.$.quantity": -1 } },
        { returnDocument: "after" }
      );

      if (!value) return res.status(404).send("Product not found in cart.");

      await db.productsCollection.updateOne(productFilter, {
        $inc: { "skus.$.stock": 1 },
      });

      const { cart } = value;

      const [productAlreadyInCart] = cart.filter(
        (product) => product.productId.toString() === objectId.toString()
      );

      if (productAlreadyInCart.quantity === 0) {
        const removeProduct = await db.usersCollection.findOneAndUpdate(
          userFilter,
          { $pull: { cart: { productId: objectId } } },
          { returnDocument: "after" }
        );

        return res.status(200).send("The product was removed from the cart.");
      }
    }

    return res.status(200).send("WAIT");
  } catch (err) {
    console.log(err);
  }
}

// BREAK

async function get(req, res) {
  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");
  const userFilter = { _id: TEMPORARY_USER_ID };

  try {
    const { cart } = await db.usersCollection.findOne(userFilter, {projection: {hashedPassword: 0}} );

    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
  }
}

export default { insert, get };
