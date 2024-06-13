import mongoose from "mongoose";

export async function connect() {
  console.log(
    process.env.BASE_URL,
    "BASE_URL",
    process.env.MONGO_URI,
    "MONGO_URI",
    process.env.TOKEN_SECRET,
    "TOKEN_SECRET",
  );
  try {
    mongoose.connect(process.env.MONGO_URI ?? "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err,
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
