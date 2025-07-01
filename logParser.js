import { extractedFile } from "./Helper.js";

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
  const ipFreqObj = {};
  const findIpAddresses = logFile.match(findIpRegex);

  if (findIpAddresses) {
    for (let ipAddressFrequency of findIpAddresses) {
      ipFreqObj[ipAddressFrequency] = ipFreqObj[ipAddressFrequency] + 1 || 1;
    }
    const sortedIpAddresses = Object.keys(ipFreqObj)
      .sort((a, b) => ipFreqObj[b] - ipFreqObj[a])
      .slice(0, 3);
    return sortedIpAddresses;
  } else {
    return "No IP addresses found in the log file.";
  }
};

export const getTopThreeVisitedUrls = (logFile) => {
  const urlFreqObj = {};
  const filteredUrlArray = logFile
    .split(" ")
    .filter((url) => url.includes("http") || url.charAt(0) == "/");

  if (filteredUrlArray.length !== 0) {
    for (let urlFrequency of filteredUrlArray) {
      urlFreqObj[urlFrequency] = urlFreqObj[urlFrequency] + 1 || 1;
    }
    const topThreeArray = Object.keys(urlFreqObj)
      .sort((a, b) => urlFreqObj[b] - urlFreqObj[a])
      .slice(0, 3);
    return topThreeArray;
  } else {
    return "No URLs found in the log file";
  }
};
console.log("Number of unique IP addresses:", getUniqueIpAddresses(extractedFile));
console.log("Top three active IP addresses", getTopThreeActiveIpAddresses(extractedFile));
console.log("Top three urls: ", getTopThreeVisitedUrls(extractedFile));
