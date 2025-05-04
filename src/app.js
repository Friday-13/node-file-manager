import { stdin, exit } from "node:process";

import { getProcessArgs } from "./utils/get-process-args.js";
import FileManger from "./file-manager.js";
import WorkDir from "./utils/work-dir.js";
import nwdOperations from "./operations/nwd/index.js";
import fileOperations from "./operations/files/index.js";
import osInfoOperations from "./operations/os-info/index.js";
import hashOperations from "./operations/hash/index.js";

export default class App {
  constructor() {
    this.fileManger = new FileManger(
      new WorkDir({}),
      this.printPrompt.bind(this),
    );
    this.username = undefined;
    this.fileManger.addOperations(nwdOperations);
    this.fileManger.addOperations(fileOperations);
    this.fileManger.addOperations(osInfoOperations);
    this.fileManger.addOperations(hashOperations);
  }

  async start() {
    const args = getProcessArgs();
    this.username = args.get("username");
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printPrompt();
    stdin.on("data", (data) => {
      const command = data.toString().trim();
      if (command === ".exit") {
        this.exit();
      }
      const [key, ...value] = data.toString().trim().split(" ");
      this.fileManger.parseOperation(key, value);
    });
  }

  exit() {
    console.log(
      `\nThank you for using File Manager, ${this.username}, goodbye!`,
    );
    exit(0);
  }

  printPrompt() {
    console.log(`You are currently in ${this.fileManger.workDir}`);
  }
}
