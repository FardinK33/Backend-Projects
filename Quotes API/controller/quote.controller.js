import express from "express";
import { Quote } from "../db.js";

const router = express.Router();

router.get("/getQuotes/:random?", async (req, res) => {
  try {
    const { random } = req.params;
    if (random) {
      const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
      if (randomQuote) {
        return res.status(200).json(randomQuote[0]);
      } else {
        return res.status(404).json({ message: "No random quote found" });
      }
    }

    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error in GetQuotes Module: ", error.message);
    res.status(500).json({ message: "Error fetching quotes" });
  }
});

router.post("/addQuote", async (req, res) => {
  try {
    const { quote, author } = req.body;

    const newQuote = new Quote({
      quote: quote,
      author: author,
    });

    const exist = await Quote.findOne({ quote });

    if (exist) {
      return res.status(400).json({ error: "Quote already exist." });
    }

    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    console.log("Error in Add Quote Route : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/deleteQuote", async (req, res) => {
  try {
    const { author, _id } = req.body;
    const quote = await Quote.findOneAndDelete({ author, _id });

    if (quote) {
      res.status(200).json({ message: "Quote deleted successfully" });
    } else {
      res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    console.log("Error in Delete Quote Module: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateQuote", async (req, res) => {
  try {
    const { quote, author, _id } = req.body;
    const updatedQuote = await Quote.findOneAndUpdate(
      { _id },
      { quote, author },
      { new: true }
    );

    if (updatedQuote) {
      res.status(200).json({ message: "Quote updated successfully" });
    } else {
      res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    console.log("Error in Update Module : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
