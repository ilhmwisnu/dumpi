import express from "express";
import apiRoute from "./routes/api";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api",apiRoute);

app.get("/", (req, res) => res.send("Hello World"))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app