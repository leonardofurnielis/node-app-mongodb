'use strict';

const liveness = async (req, res, next) => {
  try {
    const memory = process.memoryUsage();

    const healthcheck = {
      uptime: Math.floor(process.uptime()),
      version: process.version,
      sys: {
        heap_total: (memory.heapTotal * 10 ** -6).toFixed(2),
        heap_used: (memory.heapUsed * 10 ** -6).toFixed(2),
      },
    };

    return res.status(200).json(healthcheck);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  liveness,
};
