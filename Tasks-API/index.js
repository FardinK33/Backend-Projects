import express from "express";

import connectDB from "./db.js";
import AuthRoutes from "./routes/user.routes.js";
import TaskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Todos-API");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/task", TaskRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
