import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import fs from "node:fs/promises";
import path from "node:path";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";

const rmHandler = async ({ values, fileManager }) => {
  try {
    const absolutePath = resolvePath(values[0], fileManager.workDir);
    const validator = new PathValidator(fileManager.baseDir);
    await validator.validate(absolutePath, {
      mustBeInsideBase: true,
      mustBeFile: true,
    });
    await fs.rm(absolutePath);
    const relativePath = path.relative(fileManager.workDir, absolutePath);
    return relativePath;
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const rmOutput = (result) => {
  console.log(`File ${result} removed`);
};

const rm = new BaseOperation("rm", rmHandler, rmOutput);
export { rm as default };
