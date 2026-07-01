const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON is the "neurotransmitter" — parse incoming request bodies as JSON.
app.use(express.json());

// Simple request logger so every call through the API is visible.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.originalUrl}`);
  next();
});

// Health check — useful for confirming the server is alive.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DecodeLabs Task API is running.",
    endpoints: {
      "GET /tasks": "List all tasks (optional ?status= filter)",
      "GET /tasks/:id": "Get a single task",
      "POST /tasks": "Create a new task",
      "PUT /tasks/:id": "Update an existing task",
      "DELETE /tasks/:id": "Delete a task"
    }
  });
});

// Mount the resource routes.
app.use("/tasks", taskRoutes);

// 404 for anything that doesn't match a defined route.
app.use(notFoundHandler);

// Centralized error handler — must be registered last.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 DecodeLabs Task API running on http://localhost:${PORT}`);
});

module.exports = app;
