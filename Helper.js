import fs from "fs";

const logFilePath = "programming-task-example-data.log";

export const readLogFile = (logFile) => {
  try {
    const fileData = fs.readFileSync(logFile, "utf-8");
    return fileData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const frequencyCounter = (formattedLogArray) => {
  const frequencyObject = {};
  for (let valueFrequency of formattedLogArray) {
    frequencyObject[valueFrequency] = frequencyObject[valueFrequency] + 1 || 1;
  }
  return frequencyObject;
};

export const sortTopThree = (countedObject) => {
  const sortedObject = Object.keys(countedObject)
    .sort((a, b) => countedObject[b] - countedObject[a])
    .slice(0, 3);
  return sortedObject;
};

export const filterForUrls = (logFile) => {
  const filteredLogFile = logFile
    .split(" ")
    .filter((url) => url.includes("http") || url.charAt(0) == "/");
  return filteredLogFile;
};
export const extractedFile = readLogFile(logFilePath);
