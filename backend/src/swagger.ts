import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Spamton BIG SHOT API",
    version: "1.0.0",
    description: "API for Spamton’s store — be a [[BIG SHOT]]!",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" }
                },
                required: ["username", "password"]
              }
            }
          }
        },
        responses: { "200": { description: "User registered" } }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Login to get JWT",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" }
                },
                required: ["username", "password"]
              }
            }
          }
        },
        responses: { "200": { description: "JWT token returned" } }
      }
    },
    "/api/products": {
      get: {
        summary: "Get all products (public)",
        responses: { "200": { description: "List of products" } }
      },
      post: {
        summary: "Create a product",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  price: { type: "number" },
                  description: { type: "string" }
                },
                required: ["name", "price"]
              }
            }
          }
        },
        responses: { "200": { description: "Product created" } }
      }
    },
    "/api/products/{id}": {
      put: {
        summary: "Update a product",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  price: { type: "number" },
                  description: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Product updated" } }
      },
      delete: {
        summary: "Delete a product",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "200": { description: "Product deleted" } }
      }
    }
  }
};

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
