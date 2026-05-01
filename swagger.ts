import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dumpi API",
      version: "1.0.0",
      description:
        "A dummy REST API built with Express.js and TypeScript. Useful for prototyping and testing HTTP clients.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Pass any non-empty token value (e.g. `--token--`)",
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────────────────
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            password: { type: "string", minLength: 8, example: "secret123" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password", "confirmation_password"],
          properties: {
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            password: { type: "string", minLength: 8, example: "secret123" },
            confirmation_password: { type: "string", minLength: 8, example: "secret123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            token: { type: "string", example: "--token--" },
          },
        },
        // ── User ──────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            avatar: { type: "string", format: "uri", example: "https://picsum.photos/id/1/200/200" },
          },
        },
        UserListResponse: {
          type: "object",
          properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 6 },
            total: { type: "integer", example: 12 },
            total_page: { type: "integer", example: 2 },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
        UserDetailResponse: {
          type: "object",
          properties: {
            data: { $ref: "#/components/schemas/User" },
          },
        },
        // ── Profile ───────────────────────────────────────────────────────
        Profile: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john.doe@example.com" },
            avatar: { type: "string", format: "uri", example: "https://picsum.photos/id/1/200/200" },
          },
        },
        // ── Errors ────────────────────────────────────────────────────────
        ValidationError: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login failed" },
            error: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: { type: "string" },
              },
              example: { email: ["Invalid email"], password: ["String must contain at least 8 character(s)"] },
            },
          },
        },
        NotFoundError: {
          type: "object",
          properties: {
            message: { type: "string", example: "User not found" },
          },
        },
        UnauthorizedError: {
          type: "object",
          properties: {
            error: { type: "string", example: "Unauthorized" },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            message: { type: "string", example: "User deleted successfully" },
          },
        },
        UserCreateRequest: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", example: "Alice Walker" },
            email: { type: "string", format: "email", example: "alice.walker@example.com" },
            avatar: { type: "string", format: "uri", example: "https://picsum.photos/id/13/200/200" },
          },
        },
        UserUpdateRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Alice Walker" },
            email: { type: "string", format: "email", example: "alice.walker@example.com" },
            avatar: { type: "string", format: "uri", example: "https://picsum.photos/id/13/200/200" },
          },
        },
      },
    },
    paths: {
      // ── Auth ──────────────────────────────────────────────────────────────
      "/api/login": {
        post: {
          tags: ["Auth"],
          summary: "Login",
          description: "Validates email & password via Zod and returns a dummy token.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                  example: { message: "Login successful", token: "--token--" },
                },
              },
            },
            400: {
              description: "Validation failed",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      "/api/register": {
        post: {
          tags: ["Auth"],
          summary: "Register",
          description:
            "Validates email, password, and confirmation_password via Zod. Passwords must match and be at least 8 characters.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "Registration successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                  example: { message: "Registration successful", token: "--token--" },
                },
              },
            },
            400: {
              description: "Validation failed",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      // ── Users ─────────────────────────────────────────────────────────────
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Returns a paginated list of users. Defaults to page 1, limit 6.",
          parameters: [
            {
              name: "page",
              in: "query",
              description: "Page number (1-indexed)",
              schema: { type: "integer", default: 1, example: 1 },
            },
            {
              name: "limit",
              in: "query",
              description: "Number of records per page",
              schema: { type: "integer", default: 6, example: 6 },
            },
          ],
          responses: {
            200: {
              description: "Paginated user list",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserListResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Users"],
          summary: "Create a user",
          description: "Simulates creating a user and returns what the new record would look like. Data is not persisted — the list always resets on server restart.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserCreateRequest" },
              },
            },
          },
          responses: {
            201: {
              description: "User created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserDetailResponse" },
                },
              },
            },
            400: {
              description: "Missing required fields",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      "/api/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get user by ID",
          description: "Returns a single user object matched by integer ID.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "User ID",
              schema: { type: "integer", example: 1 },
            },
          ],
          responses: {
            200: {
              description: "User found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserDetailResponse" },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/NotFoundError" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Users"],
          summary: "Update a user",
          description: "Simulates a partial update and returns what the user would look like after the change. Data is not persisted.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "User ID",
              schema: { type: "integer", example: 1 },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserUpdateRequest" },
              },
            },
          },
          responses: {
            200: {
              description: "User updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserDetailResponse" },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/NotFoundError" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Users"],
          summary: "Delete a user",
          description: "Simulates deleting a user. The record is not actually removed — the list remains unchanged.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "User ID",
              schema: { type: "integer", example: 1 },
            },
          ],
          responses: {
            200: {
              description: "User deleted",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/NotFoundError" },
                },
              },
            },
          },
        },
      },
      // ── Profile ───────────────────────────────────────────────────────────
      "/api/profile": {
        get: {
          tags: ["Profile"],
          summary: "Get current user profile",
          description:
            "Returns the logged-in user's profile. Requires a non-empty `Authorization` header (value is not validated — any string works).",
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Profile data",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Profile" },
                },
              },
            },
            401: {
              description: "Missing Authorization header",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedError" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // all docs are inline above, no JSDoc scanning needed
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
