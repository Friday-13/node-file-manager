import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import fs from "node:fs/promises";
import path from "node:path";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";

const rnHandler = async ({ values, fileManager }) => {
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

    await fs.rename(oldAbsolutePath, newAbsolutePath);

    const oldRelativePath = path.relative(fileManager.workDir, oldAbsolutePath);
    const newRelativePath = path.relative(fileManager.workDir, newAbsolutePath);

    return { oldPath: oldRelativePath, newPath: newRelativePath };
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const rnOutput = (result) => {
  console.log(`File ${result.oldPath} renamed to ${result.newPath}`);
};

const rn = new BaseOperation("rn", rnHandler, rnOutput);
export { rn as default };
