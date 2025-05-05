import { operationErrorCode } from "./utils/operation-error.js";

export default class FileManger {
  constructor(workDir, printPrompt) {
    this._workDir = workDir;
    this.operations = [];
    this.printPrompt = printPrompt;
  }

  addOperations(operations) {
    this.operations.push(...operations);
  }

  get workDir() {
    return this._workDir.workDir;
  }

  get baseDir() {
    return this._workDir.baseDir;
  }

  async setWorkDir(newDir) {
    await this._workDir.setWorkDir(newDir);
  }

  async parseOperation(operationKey, operationValue) {
    try {
      for (const operation of this.operations) {
        if (operationKey === operation.key) {
          const result = await operation.handler({
            values: operationValue,
            fileManager: this,
          });
          await operation.output(result);
          this.printPrompt();
          return;
        }
      }
      console.error("Invalid input");
    } catch (err) {
      if (err.code === operationErrorCode) {
        console.log(err.message);
        console.log("Operation failed");
        this.printPrompt();
      }
    }
  }
}
