import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import fs from "node:fs/promises";
import path from "node:path";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";

const mkdirHandler = async ({ values, fileManager }) => {
  try {
    const absolutePath = resolvePath(values[0], fileManager.workDir);
    const validator = new PathValidator(fileManager.baseDir);
    await validator.validate(absolutePath, { mustBeInsideBase: true });
    await fs.mkdir(absolutePath);
    const relativePath = path.relative(fileManager.workDir, absolutePath);
    return relativePath;
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const mkdirOutput = (result) => {
  console.log(`Directory ${result} created`);
};

const mkdir = new BaseOperation("mkdir", mkdirHandler, mkdirOutput);
export { mkdir as default };
