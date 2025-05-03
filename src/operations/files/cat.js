import BaseOperation from "../base-operation.js";
import fs from "node:fs/promises";
import path from "node:path";

const catHandler = async ({ values, fileManager }) => {
  // TODO: Add path resiolving
  const absolutePath = path.join(fileManager.workDir, values[0]);
  // TODO: Rewrite with readable stream
  const content = await fs.readFile(absolutePath, { encoding: "utf-8" });
  return content;
};

const catOutput = (result) => {
  console.group();
  console.log(result);
  console.groupEnd();
};

const cat = new BaseOperation("cat", catHandler, catOutput);
export { cat as default };
