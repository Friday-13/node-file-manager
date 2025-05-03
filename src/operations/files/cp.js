import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import path from "node:path";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

const cpHandler = async ({ values, fileManager }) => {
  try {
    const oldAbsolutePath = resolvePath(values[0], fileManager.workDir);
    const newAbsolutePath = resolvePath(values[1], fileManager.workDir);

    const validator = new PathValidator(fileManager.baseDir);

    await validator.validate(oldAbsolutePath, {
      mustBeInsideBase: true,
      mustBeFile: true,
    });
    await validator.validate(newAbsolutePath, {
      mustBeInsideBase: true,
    });

    const readStream = createReadStream(oldAbsolutePath);
    const writeStream = createWriteStream(newAbsolutePath);

    await pipeline(readStream, writeStream);

    const oldRelativePath = path.relative(fileManager.workDir, oldAbsolutePath);
    const newRelativePath = path.relative(fileManager.workDir, newAbsolutePath);

    return { oldPath: oldRelativePath, newPath: newRelativePath };
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const cpOutput = (result) => {
  console.log(`File ${result.oldPath} copied to ${result.newPath}`);
};

const cp = new BaseOperation("cp", cpHandler, cpOutput);
export { cp as default };
