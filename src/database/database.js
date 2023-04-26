import { MongoClient } from "mongodb";


// Função de conexão com o banco de dados
let db;
export async function connectDataBase(dataBaseConfig) {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  try {
    await mongoClient.connect();
    db = mongoClient.db();
  } catch (err) {
    throw err;
  }
}


// Essa função retorna o db para acesso as funções de acesso ao Mongo db
// é só importar essa função e dar um:  const db = getDataBase();
export function getDataBase() {
  return db;
}
