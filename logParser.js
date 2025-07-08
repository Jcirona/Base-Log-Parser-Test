import { extractedFile, frequencyCounter, sortTopThree, filterForUrls } from "./Helper.js";

const findIpRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
export const getUniqueIpAddresses = (logFile) => {
  const findIpAddresses = logFile.match(findIpRegex);

  if (findIpAddresses) {
    const uniqueIpAddresses = [...new Set(findIpAddresses)];
    return uniqueIpAddresses.length;
  } else {
    return "No IP addresses found in the log file.";
  }
};

export const getTopThreeActiveIpAddresses = (logFile) => {
  const findIpAddresses = logFile.match(findIpRegex);
  if (findIpAddresses) {
    const countedIpAddresses = frequencyCounter(findIpAddresses);
    const sortedIpAddresses = sortTopThree(countedIpAddresses);
    return sortedIpAddresses;
  } else {
    return "No IP addresses found in the log file.";
  }
};

export const getTopThreeVisitedUrls = (logFile) => {
  const filteredUrlArray = filterForUrls(logFile);

  if (filteredUrlArray.length !== 0) {
    const countedUrlAddresses = frequencyCounter(filteredUrlArray);
    const sortedUrlAddresses = sortTopThree(countedUrlAddresses);
    return sortedUrlAddresses;
  } else {
    return "No URLs found in the log file";
  }
};
// extract similar functionality between last two functions for the iterating and slicing
// function to loop through the file and return the data for the main functions
// look at refactoring some of the iterating logic
console.log("Number of unique IP addresses:", getUniqueIpAddresses(extractedFile));
console.log("Top three active IP addresses", getTopThreeActiveIpAddresses(extractedFile));
console.log("Top three urls: ", getTopThreeVisitedUrls(extractedFile));
