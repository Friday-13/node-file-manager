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

  async setWorkDir(newDir) {
    try {
      await this._workDir.setWorkDir(newDir);
    } catch (err) {
      if (err.code === "PATHINVALID") {
        console.error(err.message);
      }
    }
  }

  async parseOperation(operationKey, operationValue) {
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
  }
}
