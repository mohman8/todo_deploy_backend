import mongoose from "mongoose";
export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED...");
    return;
  } catch (error) {
    console.error(`error connecting to mongodb: ${error}`);
    process.exit(1);
  }
};
