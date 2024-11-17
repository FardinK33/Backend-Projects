// const express = require("express");
import express from "express"; // Also add "type": "module", to package json

import quotes from "./controller/quote.controller.js";
import { connectToMongoDB } from "./db.js";

const app = express();

app.use(express.json());

app.use("/api", quotes);

app.listen(3000, () => {
  connectToMongoDB();
  console.log("Server is running on port 3000");
});
