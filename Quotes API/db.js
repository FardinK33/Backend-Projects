import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/QuotesDB");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
});

const Quote = mongoose.model("quote", quoteSchema);

export { connectToMongoDB, Quote };
