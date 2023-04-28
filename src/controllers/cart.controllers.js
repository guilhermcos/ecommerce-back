import { ObjectId } from "mongodb";
import db from "../database/database.js";

async function insert(req, res) {
  const { productId } = req.params;
  const { update } = req.query

  const TEMPORARY_USER_ID = new ObjectId("644ac67cdb3a65eb2c976212");

  const objectId = new ObjectId(productId);

  const productFilter = { "skus._id": objectId };

  const userFilter = { _id: TEMPORARY_USER_ID };

  try {
    const { skus } = await db.productsCollection.findOne(productFilter, {
      projection: { "skus.$": 1, _id: 0 },
    });

    const [product] = skus;

    if(!update || update === "increase") {

      if (product.stock <= 0)
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
          { "_id": TEMPORARY_USER_ID, "cart.productId": objectId },
          { $inc: { "cart.$.quantity": 1 } }
        );     
  
      if (!productAlreadyInCart) {
        const productToCart = {
          productId: objectId,
          quantity: 1,
        };
  
        const cartUpdated = await db.usersCollection.findOneAndUpdate(
          userFilter,
          { $push: { cart: productToCart } },
          { returnDocument: "after" }
        );
      }
    }

    if(update === "decrease") {

      
      const { value } = await db.usersCollection.findOneAndUpdate({"_id": TEMPORARY_USER_ID, "cart.productId": objectId}, {$inc: {"cart.$.quantity": -1}} ,{returnDocument: "after"})
      
      if (!value) return res.status(404).send("Product not found in cart.")

      await db.productsCollection.updateOne(productFilter, {$inc: {"skus.$.stock": 1}})

      const { cart } = value

      const [ productAlreadyInCart ] = cart.filter((product) => product.productId.toString() === objectId.toString())

      if(productAlreadyInCart.quantity === 0) {

        const removeProduct = await db.usersCollection.findOneAndUpdate(userFilter, {$pull: {cart: {"productId": objectId}}}, {returnDocument: "after"})

        console.log("AQUI JONILSON")
        console.log(removeProduct)

        return res.status(200).send("The product was removed from the cart.")
      }

      // await db.productsCollection.updateOne(productFilter, {
      //   $inc: { "skus.$.stock": -1 },
      // });
    }


    
    return res.status(200).send("WAIT");
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  const { updateCart } = req.params;

  try {

    if(updateCart === "increase") {

    }

  } catch (err) {}
}

export default { insert, update };
