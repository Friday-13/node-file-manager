import BaseOperation from "../base-operation.js";
import resolvePath from "../../utils/resolve-path.js";
import { createReadStream } from "node:fs";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream/promises";

const hashHandler = async ({ values, fileManager }) => {
  try {
    const absolutePath = resolvePath(values[0], fileManager.workDir);
    const validator = new PathValidator(fileManager.baseDir);
    await validator.validate(absolutePath, { mustBeInsideBase: true });
    const readStream = createReadStream(absolutePath, { encoding: "utf-8" });
    const hashConfigs = createHash("sha256");
    await pipeline(readStream, hashConfigs);
    return hashConfigs.digest("hex");
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const hash = new BaseOperation("hash", hashHandler);
export { hash as default };
