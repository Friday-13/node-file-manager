import os from "node:os";
import path from "node:path"

export default class FileManger {
  constructor() {
    this.workDir = os.homedir();
    this.operations = [];
  }

  addOperations(operations) {
    this.operations.push(...operations);
  }

  setWorkDir(newDir) {
    if (typeof newDir === 'string') {
      this.workDir = path.normalize(newDir);
    }
    else if (newDir instanceof Array) {
      this.workDir = path.join();
    } else {
      throw new Error("Incorrect path format")
    }
  }

  async parseOperation(operationKey, operationValue) {
    for (const operation of this.operations) {
      if (operationKey === operation.key) {
        const result = await operation.handler({value: operationValue, fileManager: this});
        operation.output(result);
        return;
      }
    }
    console.log('Invalid input')
  }
}
