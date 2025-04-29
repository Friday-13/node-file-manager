import { stdout } from "node:process";

import { getProcessArgs } from "./utils/get_process_args.js";

export default class App {
  constructor() {
    this.fileManger = null;
    this.username = undefined;
  }

  async start() {
    const args = getProcessArgs();
    this.username = args.get("username");

    stdout.write(`Welcome to the File Manager, ${this.username}!\n`);
  }

  exit() {
    stdout.write(
      `Thank you for using File Manager, ${this.username}, goodbye!\n`,
    );
  }
}
