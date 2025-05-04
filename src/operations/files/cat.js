import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import { createReadStream } from "node:fs";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";

const catHandler = async ({ values, fileManager }) => {
  try {
    const absolutePath = resolvePath(values[0], fileManager.workDir);
    const validator = new PathValidator(fileManager.baseDir);
    await validator.validate(absolutePath, { mustBeInsideBase: true });
    const readStream = createReadStream(absolutePath, { encoding: "utf-8" });
    return readStream;
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const catOutput = (result) => {
  const readPromise = new Promise((resolve, reject) => {
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
  return readPromise;
};

const cat = new BaseOperation("cat", catHandler, catOutput);
export { cat as default };
