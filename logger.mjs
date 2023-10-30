import winston from "winston"

const { transports, format, createLogger } = winston
const logFormat = format.printf(
    (info) => `${info.timestamp} | ${info.level} | ${info.message}`,
)
const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        // Format the metadata object
        format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    ),
    handleExceptions: true,
    handleRejections: true,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat,
            ),
        }),
    ],
})

export default logger;
