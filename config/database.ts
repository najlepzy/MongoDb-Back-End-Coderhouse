import mongoose from "mongoose";

export async function initMongooseDb() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("[Error] - MONGO_URI Not defined");
    }

    await mongoose.connect(mongoURI, {});
    console.log("[OK] - Succesfully connected to MongoDB Database.\n\tDatabase:"+process.env.MONGO_URI);
  } catch (error) {
    console.error("[Error] - Could not connect to DB:", error);
  }
}
