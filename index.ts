import express from "express";
import swaggerUi from "swagger-ui-express";
import apiRoute from "./routes/api";
import swaggerSpec from "./swagger";

const app = express();

const port = 3000
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRoute);

app.get("/", (req, res) => res.send("Hello World"))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app