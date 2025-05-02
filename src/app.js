import { stdin, exit } from "node:process";

import { getProcessArgs } from "./utils/get_process_args.js";
import FileManger from "./file-manager.js";
import nwdOperations from "./operations/nwd/index.js";

export default class App {
  constructor() {
    this.fileManger = new FileManger();
    this.username = undefined;
    this.fileManger.addOperations(nwdOperations);
  }

  async start() {
    const args = getProcessArgs();
    this.username = args.get("username");
    console.log(`Welcome to the File Manager, ${this.username}!`);
    stdin.on("data", (data) => {
      const command = data.toString().trim();
      if (command === ".exit") {
        this.exit();
      }
      this.fileManger.parseOperation(data.toString().trim());
    });
  }

  exit() {
    console.log(
      `\nThank you for using File Manager, ${this.username}, goodbye!`,
    );
    exit(0);
  }
}
