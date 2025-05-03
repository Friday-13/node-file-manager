import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import { createReadStream } from "node:fs";

const catHandler = async ({ values, fileManager }) => {
  const absolutePath = resolvePath(values[0], fileManager.workDir);
  const readStream = createReadStream(absolutePath, { encoding: "utf-8" });
  return readStream;
};

const catOutput = (result) => {
  const readStream = new Promise((resolve) => {
    result.on("open", () => console.group());
    result.on("data", (chunk) => {
      console.log(chunk);
    });
    result.on("end", () => {
      console.groupEnd();
      resolve();
    });
  });
  return readStream;
};

const cat = new BaseOperation("cat", catHandler, catOutput);
export { cat as default };
