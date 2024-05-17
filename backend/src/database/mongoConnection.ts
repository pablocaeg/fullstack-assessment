import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb+srv://pablocarrascoegea:ubB0atKisxJ7r19G@phone-management.jqu4h6j.mongodb.net/?retryWrites=true&w=majority&appName=phone-management';

let client: MongoClient | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (client === null) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('phone-management');
};
