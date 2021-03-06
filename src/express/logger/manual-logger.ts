import pino, {Bindings, Logger} from "pino";

import {LogLevel} from "../../constants";
import {ENV} from "../../shared/env/env";

const logger = pino({
  name: `logger`,
  level: ENV.LOG_LEVEL ?? LogLevel.ERROR,
});

function getLogger(options: Bindings = {}): Logger {
  return logger.child(options);
}

export {
  getLogger,
};
