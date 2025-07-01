import fs from "fs";

const logFilePath = "programming-task-example-data.log";

const readLogFile = (logFile) => {
  try {
    const fileData = fs.readFileSync(logFile, "utf-8");
    return fileData;
  } catch (error) {
    return error.message;
  }
};

export const extractedFile = readLogFile(logFilePath);
