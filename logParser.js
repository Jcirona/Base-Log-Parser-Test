import { extractedFile, frequencyCounter, sortTopThree, filterForUrls } from "./Helper.js";

const findIpRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
const extractedIpAddresses = extractedFile.match(findIpRegex);
const extractedUrls = filterForUrls(extractedFile);

export const getUniqueIpAddresses = (ipAddressArray) => {
  if (ipAddressArray) {
    const uniqueIpAddresses = [...new Set(ipAddressArray)];
    return uniqueIpAddresses.length;
  } else {
    return "No IP addresses found in the log file.";
  }
};

export const getTopThreeActiveIpAddresses = (ipAddressArray) => {
  if (ipAddressArray) {
    const countedIpAddresses = frequencyCounter(ipAddressArray);
    const sortedIpAddresses = sortTopThree(countedIpAddresses);
    return sortedIpAddresses;
  } else {
    return "No IP addresses found in the log file.";
  }
};

export const getTopThreeVisitedUrls = (urlArray) => {
  if (urlArray.length !== 0) {
    const countedUrlAddresses = frequencyCounter(urlArray);
    const sortedUrlAddresses = sortTopThree(countedUrlAddresses);
    return sortedUrlAddresses;
  } else {
    return "No URLs found in the log file";
  }
};

console.log("Number of unique IP addresses:", getUniqueIpAddresses(extractedIpAddresses));
console.log("Top three active IP addresses", getTopThreeActiveIpAddresses(extractedIpAddresses));
console.log("Top three urls: ", getTopThreeVisitedUrls(extractedUrls));
