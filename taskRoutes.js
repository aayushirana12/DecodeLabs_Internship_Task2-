const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const { validateTaskInput, validateIdParam } = require("../middleware/validateTask");

// RESTful naming: resources are nouns ("/tasks"), methods are verbs (GET/POST/PUT/DELETE).
router.get("/", getAllTasks);
router.get("/:id", validateIdParam, getTaskById);
router.post("/", validateTaskInput, createTask);
router.put("/:id", validateIdParam, validateTaskInput, updateTask);
router.delete("/:id", validateIdParam, deleteTask);

module.exports = router;
