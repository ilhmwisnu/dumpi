import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import apiRoute from "./routes/api";
import swaggerSpec from "./swagger";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRoute);

app.get("/", (_req, res) => {
  res.json({
    name: "Dumpi API",
    description: "A dummy REST API built with Express.js and TypeScript",
    version: "1.0.0",
    docs: "/api-docs",
    endpoints: {
      auth: ["POST /api/login", "POST /api/register"],
      users: [
        "GET /api/users",
        "GET /api/users/:id",
        "POST /api/users",
        "PUT /api/users/:id",
        "DELETE /api/users/:id",
      ],
      profile: ["GET /api/profile"],
    },
  });
});

// 404 handler — must come after all routes
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler — must have 4 params to be recognised by Express
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;