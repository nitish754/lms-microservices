function createLogger(serviceName) {
  return {
    info: (msg, meta) => console.log(JSON.stringify({ level: "info", service: serviceName, msg, meta })),
    warn: (msg, meta) => console.warn(JSON.stringify({ level: "warn", service: serviceName, msg, meta })),
    error: (msg, meta) => console.error(JSON.stringify({ level: "error", service: serviceName, msg, meta }))
  };
}

module.exports = {
  createLogger
};
