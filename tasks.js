// In-memory "database".
// Project 2 is about API logic, not persistence — a real database
// (the "Project 3" milestone) comes later. For now, data lives in memory
// and resets whenever the server restarts.

let tasks = [
  {
    id: 1,
    title: "Design the API endpoints",
    description: "Plan out GET and POST routes for the tasks resource",
    status: "completed",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Add input validation",
    description: "Never trust the client — validate every incoming request",
    status: "in-progress",
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

function getNextId() {
  return nextId++;
}

module.exports = { tasks, getNextId };
