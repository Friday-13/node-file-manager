import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

class PathValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = "PATHINVALID";
  }
}

export default class PathValidator {
  constructor(baseDir) {
    this.baseDir = baseDir ? baseDir : os.homedir();
  }

  async validate(
    absolutePath,
    options = {
      mustBeInsideBase: true,
      mustBeDir: false,
      mustBeFile: false,
      mustExist: false,
    },
  ) {
    if (options.mustExist) await this.isPathExist(absolutePath);
    if (options.mustBeDir) await this.isDir(absolutePath);
    if (options.mustBeFile) await this.isFile(absolutePath);
    if (options.mustBeInsideBase) this.isLowerThanBase(absolutePath);
  }

  async isPathExist(testPath) {
    try {
      await fs.access(testPath);
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new PathValidationError(`Path ${testPath} doesn't exist`);
      }
      throw err;
    }
  }

  async isDir(testPath) {
    const stat = await fs.stat(testPath);
    if (!stat.isDirectory()) {
      throw new PathValidationError("Path must be dir dir");
    }
  }

  async isFile(testPath) {
    const stat = await fs.stat(testPath);
    if (!stat.isFile()) {
      throw new PathValidationError("Path must be file");
    }
  }

  isLowerThanBase(testPath) {
    const relativePath = path.relative(this.baseDir, testPath);
    if (relativePath.startsWith("..")) {
      throw new PathValidationError(`Path must be lower than ${this.baseDir}`);
    }
  }
}
