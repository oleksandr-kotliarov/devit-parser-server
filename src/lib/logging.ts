import Winston, { format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${message} [${level.toUpperCase()}] - ${timestamp}`;
});

const logger = Winston.createLogger({
  format: combine(timestamp(), customFormat, colorize()),
  transports: [new Winston.transports.Console()],
});

export default logger;
