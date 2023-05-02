import { ObjectId } from "mongodb";
import database from "../database/database.js";
const { productsCollection, usersCollection, sessionsCollection } = database;

export default class ProductControllers {
  async getCatalog(req, res) {
    const { gender, category } = req.params;
    const genderUpperCase = gender[0].toUpperCase() + gender.slice(1);
    const mainCategoryUpperCase = category[0].toUpperCase() + category.slice(1);
    try {
      let products;
      if (category === "all") {
        products = await productsCollection
          .find({ gender: genderUpperCase })
          .toArray();
      } else {
        products = await productsCollection
          .find({
            gender: genderUpperCase,
            mainCategory: mainCategoryUpperCase,
          })
          .toArray();
      }
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getProduct(req, res) {
    try {
      const product = await productsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!product) return res.status(404).send("product not found");
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
