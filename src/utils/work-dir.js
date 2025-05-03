import os from "node:os";
import PathValidator from "./path-validator.js";
import resolvePath from "./resolve-path.js";

export default class WorkDir {
  constructor({ workDir, baseDir }) {
    this.baseDir = baseDir ? baseDir : os.homedir();
    this.workDir = workDir ? workDir : os.homedir();
  }

  async setWorkDir(rawPath) {
    const absolutePath = resolvePath(rawPath, this.workDir);
    await this.verifyPath(absolutePath);
    this.workDir = absolutePath;
  }

  async verifyPath(clearPath) {
    const pathValidator = new PathValidator(this.baseDir);
    await pathValidator.validate(clearPath, {
      mustBeInsideBase: true,
      mustExist: true,
      mustBeDir: true,
    });
  }
}
