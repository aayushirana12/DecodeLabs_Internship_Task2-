// Global error handler — every unexpected failure gets funneled here
// instead of crashing the process or leaking a raw stack trace to the client.

function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} -`, err.message);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error"
  });
}

// 404 handler — for any route that doesn't match a defined endpoint.
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} — route does not exist.`
  });
}

module.exports = { errorHandler, notFoundHandler };
