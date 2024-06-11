import express from "express";
import appRoute from "./routes/api";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api",appRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
