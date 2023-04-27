import { ObjectId } from "mongodb";
import db from "../database/database.js"

// Generate a random number between 0 and 15
function randomNumber() {
  return Math.floor(Math.random() * 16);
}

// Output the random number to the console

const productDocument = {
  title: "Short Sleeve T-Shirt",
  gender: "Men",
  mainCategory: "Clothes",
  subCategory: "T-shirt",
  color: "Grey", // CHANGE
  brand: "Hering",
  price: { cents: 7900, currency: "USD", discount: 0 }, //CHANGE
  description: "A comfortable and stylish slim t-shirt.",
  thumbnail:
    "https://hering.vtexassets.com/arquivos/ids/172440/0201-MD307S-C1.jpg?v=638181134312570000", //CHANGE
  images: [
    "https://hering.vtexassets.com/arquivos/ids/172442/0201-MD307S-C3.jpg?v=638181134347030000",
    "https://hering.vtexassets.com/arquivos/ids/172443/0201-MD307S-C4.jpg?v=638181134362470000",
  ],
  sizes: [
    {
      _id: new ObjectId(),
      size: "S",
      stock: randomNumber(),
    },
    {
      _id: new ObjectId(),
      size: "M",
      stock: randomNumber(),
    },
    {
      _id: new ObjectId(),
      size: "L",
      stock: randomNumber(),
    },
  ],
};

const userDocument = {
  name: "Ricardo Lima",
  email: "ricardo@gmail.com",
  hashedPassword: "098u340ajfasdjf",
  mainAddress: {
    street: "",
    number: "4",
    neighborhood: "Moema",
    city: "sao paulo",
    state: "SC",
    postalCode: "0878058",
  },
  cart: [
    { productId: "63d2dd46e77e22e91a55ed48", quantity: 1 },
    { productId: "63d2dd46e77e22e91a55ed48", quantity: 2 },
  ],
};

const ordersDocument = {
  userId: "0938905485390345",
  paymentStatus: "processed",
  amout: { cents: 10000, currency: "USD" },
  items: [
    {
      productId: "09820958320495",
      title: "Short Sleeve T-Shirt",
      quantity: 2,
      price: { cents: 5000, currency: "USD", discount: 5 },
      shippingAddress: {
        street: "",
        number: "4",
        neighborhood: "Moema",
        city: "sao paulo",
        state: "SC",
        postalCode: "0878058",
      },
    },
  ],
};

const paymentDocument = {
  userId: "983450923845",
  method: "Credit",
  status: "Verified",
  card: {
    type: "visa",
    hashedNumber: "982093458230945820934",
    lastFourNumbers: "9345",
    expiryMonth: "12",
    expiryYear: "2031",
    cvvVerified: true
  }
}

async function createProduct(req, res) {
  try {
    await db.productsCollection.insertOne(productDocument);

    return res.sendStatus(212);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    await getDataBase().collection("users").insertOne(userDocument);

    return res.sendStatus(212);
  } catch (error) {
    console.log(error);
  }
}

export default { createProduct, createUser };
