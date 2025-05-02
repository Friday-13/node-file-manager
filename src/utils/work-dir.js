import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

class WorkDirError extends Error {
  constructor(message) {
    super(message);
    this.code = "WDERROR";
  }
}

export default class WorkDir {
  constructor({ workDir, baseDir }) {
    this.baseDir = baseDir ? baseDir : os.homedir();
    this.workDir = workDir ? workDir : os.homedir();
  }

  async setWorkDir(rawPath) {
    const absolutePath = this.getAbsolutePath(rawPath);
    await this.verifyPass(absolutePath);
    this.workDir = absolutePath;
  }

  getAbsolutePath(rawPath) {
    const formatedPath = path.normalize(rawPath);
    if (path.isAbsolute(formatedPath)) {
      return formatedPath;
    }
    const absolutePath = path.join(this.workDir, formatedPath);
    return path.normalize(absolutePath);
  }

  async verifyPass(clearPath) {
    await this.isPathExist(clearPath);
    await this.isDir(clearPath);
    this.isLowerThanBase(clearPath);
  }

  async isPathExist(testPath) {
    try {
      await fs.access(testPath);
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new WorkDirError(`Dir ${testPath} doesn't exist`);
      }
      throw err;
    }
  }

  async isDir(testPath) {
    const stat = await fs.stat(testPath);
    if (!stat.isDirectory()) {
      throw new WorkDirError("Path isn't a dir");
    }
  }

  isLowerThanBase(testPath) {
    const relativePath = path.relative(this.baseDir, testPath);
    if (relativePath.startsWith("..")) {
      throw new WorkDirError(`Working dir can't be upper than ${this.baseDir}`);
    }
  }
}
