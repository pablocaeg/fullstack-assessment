import { Collection, Document, Filter, OptionalUnlessRequiredId, WithId, UpdateFilter } from 'mongodb';
import { connectToDatabase } from './mongoConnection';

export class MongoRepository<T extends Document> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private async getCollection(): Promise<Collection<T>> {
    const db = await connectToDatabase();
    return db.collection<T>(this.collectionName);
  }

  async findAll(filter: Filter<T> = {}): Promise<WithId<T>[]> {
    const collection = await this.getCollection();
    return collection.find(filter).toArray();
  }

  async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    const collection = await this.getCollection();
    return collection.findOne(filter);
  }

  async insertOne(document: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
    const collection = await this.getCollection();
    const result = await collection.insertOne(document);
    const insertedDocument = await collection.findOne({ _id: result.insertedId as any } as Filter<T>);
    if (!insertedDocument) {
      throw new Error('Failed to fetch the inserted document.');
    }
    return insertedDocument as WithId<T>;
  }

  async updateOne(filter: Filter<T>, update: Partial<T>): Promise<WithId<T> | null> {
    try {
      const collection = await this.getCollection();

      const result = await collection.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: 'after' }
      );

      if (!result) {
        return null;
      }

      return result as WithId<T>;
    } catch (error) {
      throw new Error("Failed to update document");
    }
  }

  async deleteOne(filter: Filter<T>): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne(filter);
    return result.deletedCount === 1;
  }
}
