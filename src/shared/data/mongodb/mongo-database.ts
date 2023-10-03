import mongoose from "mongoose";

interface Options {
  dbUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, dbUrl } = options;
    try {
      await mongoose.connect(dbUrl, { dbName: dbName });
      console.log("Mongo connected");
    } catch (error) {
      console.log("Mongo connection error");
      throw error;
    }
  }
}
