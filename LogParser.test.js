import {
  getUniqueIpAddresses,
  getTopThreeActiveIpAddresses,
  getTopThreeVisitedUrls,
} from "./logParser";

describe("happy path results", () => {
  test("it displays the correct number of unique IP addresses", () => {
    const uniqueIpAddresses = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"

    168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    
    177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;

    expect(getUniqueIpAddresses(uniqueIpAddresses)).toEqual(2);
  });
  test("it gets the top 3 active IP addresses", () => {
    const ipAddresses = `
      177.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      132.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      123.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      123.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      137.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      137.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      137.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      137.71.128.23 - - [10/Jul/2018:22:21:28 +0200]
      147.71.128.21 - - [10/Jul/2018:22:21:28 +0200]
      `;

    expect(getTopThreeActiveIpAddresses(ipAddresses)).toEqual([
      "137.71.128.21",
      "123.71.128.21",
      "177.71.128.21",
    ]);
  });
  test("it gets the top 3 most visited URLs", () => {
    const urlPaths =
      "/docs/manage-websites/ http://example.net/faq/ /docs/manage-websites/ /intranet-analytics/ /intranet-analytics/ /docs/manage-websites/ ";
    expect(getTopThreeVisitedUrls(urlPaths)).toEqual([
      "/docs/manage-websites/",
      "/intranet-analytics/",
      "http://example.net/faq/",
    ]);
  });
});

describe("Sad path results", () => {
  it("Finds no ip addresses in log file", () => {
    const logWithNoAddresses = "test";
    expect(getUniqueIpAddresses(logWithNoAddresses)).toEqual(
      "No IP addresses found in the log file."
    );
    expect(getTopThreeActiveIpAddresses(logWithNoAddresses)).toEqual(
      "No IP addresses found in the log file."
    );
  });
  test("Finds no URLs in log file", () => {
    const logWithNoUrls = "Test";
    expect(getTopThreeVisitedUrls(logWithNoUrls)).toEqual("No URLs found in the log file");
  });
});
