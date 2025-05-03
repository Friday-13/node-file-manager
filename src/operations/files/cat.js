import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import { createReadStream } from "node:fs";
import OperationError from "../../utils/operation-error.js";

const catHandler = async ({ values, fileManager }) => {
  const absolutePath = resolvePath(values[0], fileManager.workDir);
  const readStream = createReadStream(absolutePath, { encoding: "utf-8" });
  return readStream;
};

const catOutput = (result) => {
  const readStream = new Promise((resolve, reject) => {
    result.on("open", () => console.group());
    result.on("data", (chunk) => {
      console.log(chunk);
    });
    result.on("end", () => {
      console.groupEnd();
      resolve();
    });
    result.on("end", () => {
      console.groupEnd();
      resolve();
    });
    result.on("error", (err) => {
      console.groupEnd();
      reject(new OperationError(err.message));
    });
  });
  return readStream;
};

const cat = new BaseOperation("cat", catHandler, catOutput);
export { cat as default };
