import os from "node:os";

export default class FileManger {
  constructor() {
    this.workDir = os.homedir();
    this.operations = [];
  }

  addOperations(operations) {
    this.operations.push(...operations);
  }

  async parseOperation(operationKey, operationValue) {
    for (const operation of this.operations) {
      if (operationKey === operation.key) {
        const result = await operation.handler(operationValue, this);
        operation.output(result);
      }
    }
  }
}
