import mongoose from "mongoose";
import { CustomError } from "../../utils/custom.error";

interface Options {
  dbUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, dbUrl } = options;
    try {
      await mongoose.connect(dbUrl, { dbName: dbName });
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }
}
