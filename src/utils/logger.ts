enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

class Logger {
  static info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  static warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  static error(message: string, error?: Error | unknown, context?: any): void {
    if (error instanceof Error) {
      this.log(LogLevel.ERROR, message, {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      });
    } else {
      this.log(LogLevel.ERROR, message, { error, context });
    }
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== "production") {
      this.log(LogLevel.DEBUG, message, data);
    }
  }

  private static log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logMessage = {
      timestamp,
      level,
      message,
      data,
      environment: process.env.NODE_ENV || "development",
    };

    switch (level) {
      case LogLevel.ERROR:
        console.error(JSON.stringify(logMessage, null, 2));
        // Aqui você poderia integrar com serviços de monitoramento como Sentry
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(logMessage, null, 2));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(logMessage, null, 2));
        break;
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(logMessage, null, 2));
        break;
    }
  }
}

export default Logger;
