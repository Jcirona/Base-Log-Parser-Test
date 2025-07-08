import { jest } from "@jest/globals";
import fs from "fs";
import { frequencyCounter, sortTopThree, filterForUrls, readLogFile } from "./Helper.js";

describe("Helper functions", () => {
  test("Our log file is read and data is returned", () => {
    const testLog = "unit-test-data.log";
    expect(readLogFile(testLog)).toEqual(
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"'
    );
  });

  test("Frequency counter iterates correctly", () => {
    const testLogArray = ["test", "test", "test", "lorem", "lorem", "ipsum"];
    expect(frequencyCounter(testLogArray)).toEqual({
      ipsum: 1,
      lorem: 2,
      test: 3,
    });
  });
  test("sortTopThree correctly sorts the top three values", () => {
    const testFreqObj = { test: 4, lorem: 1, ipsum: 3, foo: 2 };
    expect(sortTopThree(testFreqObj)).toEqual(["test", "ipsum", "foo"]);
  });
  test("filterForUrls correctly filters a log", () => {
    const testLogFile =
      "This is a test log file http://test.org/testing it does many tests and tests real good /test/analytics";
    expect(filterForUrls(testLogFile)).toEqual(["http://test.org/testing", "/test/analytics"]);
  });
});

describe("read log file function sad path", () => {
  it("throws an error only when invalid file is provided", () => {
    const invalidFile = "invalid-file.jpg";
    const testLog = "unit-test-data.log";
    fs.readFileSync = jest.fn();
    fs.readFileSync.mockImplementationOnce(() => {
      const error = new Error(`ENOENT: no such file or directory, open '${invalidFile}'`);
      error.code = "ENOENT";
      throw error;
    });
    expect(() => readLogFile(invalidFile)).toThrow(
      `ENOENT: no such file or directory, open '${invalidFile}'`
    );
    expect(() => readLogFile(testLog)).not.toThrow();
  });
});
