const { tasks, getNextId } = require("../data/tasks");

// GET /tasks — Retrieval. Safe. Idempotent.
function getAllTasks(req, res) {
  const { status } = req.query;

  let result = tasks;
  if (status) {
    result = tasks.filter((t) => t.status === status);
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
}

// GET /tasks/:id — fetch a single resource by id.
function getTaskById(req, res) {
  const task = tasks.find((t) => t.id === req.taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${req.taskId} not found.`
    });
  }

  res.status(200).json({ success: true, data: task });
}

// POST /tasks — Creation. Unsafe. Non-idempotent.
function createTask(req, res) {
  const { title, description, status } = req.body;

  const newTask = {
    id: getNextId(),
    title: title.trim(),
    description: description ? description.trim() : "",
    status: status || "pending",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  // 201 Created + Location header, the RESTful way to announce a new resource.
  res
    .status(201)
    .location(`/tasks/${newTask.id}`)
    .json({ success: true, data: newTask });
}

// PUT /tasks/:id — Update / Replacement.
function updateTask(req, res) {
  const task = tasks.find((t) => t.id === req.taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${req.taskId} not found.`
    });
  }

  const { title, description, status } = req.body;
  task.title = title.trim();
  task.description = description ? description.trim() : task.description;
  task.status = status || task.status;

  res.status(200).json({ success: true, data: task });
}

// DELETE /tasks/:id — Removal.
function deleteTask(req, res) {
  const index = tasks.findIndex((t) => t.id === req.taskId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${req.taskId} not found.`
    });
  }

  tasks.splice(index, 1);

  // 204 No Content — successful deletion, nothing to send back.
  res.status(204).send();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
