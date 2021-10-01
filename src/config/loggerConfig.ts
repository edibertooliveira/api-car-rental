import pino from 'pino';
import expressPino from 'express-pino-logger';
import * as prettifier from 'pino-pretty';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const logger = pino({
  customLevels: levels,
  prettyPrint: {
    levelFirst: true,
  },
  prettifier,
});

const expressLogger = expressPino({
  logger,
  level: 'http',
});

export { logger, expressLogger };
