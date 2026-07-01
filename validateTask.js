// The Gatekeeper Rule: "Never Trust the Client."
// Two layers of validation, just like the training deck describes:
//   1. Syntactic — is the data shaped correctly? (right fields, right types)
//   2. Semantic  — does the data make sense? (valid values, business rules)

const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];

function validateTaskInput(req, res, next) {
  const { title, description, status } = req.body;
  const errors = [];

  // --- Syntactic validation: is the format correct? ---
  if (req.body === undefined || typeof req.body !== "object") {
    return res.status(400).json({
      success: false,
      error: "Request body must be a valid JSON object."
    });
  }

  if (!title || typeof title !== "string") {
    errors.push("title is required and must be a string.");
  } else if (title.trim().length === 0) {
    errors.push("title cannot be empty.");
  } else if (title.length > 100) {
    errors.push("title must be 100 characters or fewer.");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string if provided.");
  }

  // --- Semantic validation: is the logic valid? ---
  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${ALLOWED_STATUSES.join(", ")}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed.",
      details: errors
    });
  }

  next();
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: "id must be a positive integer."
    });
  }

  req.taskId = id;
  next();
}

module.exports = { validateTaskInput, validateIdParam, ALLOWED_STATUSES };
