const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL not provided in the environment variables.");
    }

    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected:", connection.host);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = connectDb;
