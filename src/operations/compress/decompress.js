import resolvePath from "../../utils/resolve-path.js";
import { createReadStream, createWriteStream } from "node:fs";
import OperationError from "../../utils/operation-error.js";
import PathValidator from "../../utils/path-validator.js";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { createBrotliDecompress } from "node:zlib";
import BaseOperation from "../base-operation.js";
import resolveDestinationPath from "../../utils/resolve-destination-path.js";

const decompressHandler = async ({ values, fileManager }) => {
  try {
    const validator = new PathValidator(fileManager.baseDir);

    const filePath = resolvePath(values[0], fileManager.workDir);
    await validator.validate(filePath, {
      mustBeInsideBase: true,
      mustBeFile: true,
    });

    const destinationPath = await resolveDestinationPath(
      values[1],
      fileManager.workDir,
      filePath,
    );
    await validator.validate(destinationPath, {
      mustBeInsideBase: true,
    });

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(destinationPath);
    const decompressStream = createBrotliDecompress();

    await pipeline(readStream, decompressStream, writeStream);

    const fileRelativePath = path.relative(fileManager.workDir, filePath);
    const destinationRelativePath = path.relative(
      fileManager.workDir,
      destinationPath,
    );

    return {
      filePath: fileRelativePath,
      destinationPath: destinationRelativePath,
    };
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const decompressOutput = (result) => {
  console.log(
    `File ${result.filePath} decomressed to ${result.destinationPath}`,
  );
};

const decompress = new BaseOperation(
  "decompress",
  decompressHandler,
  decompressOutput,
);
export { decompress as default };
