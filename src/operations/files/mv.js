import BaseOperation from "../base-operation.js";
import cp from "./cp.js";
import rm from "./rm.js";

const mvHandler = async ({ values, fileManager }) => {
  const result = await cp.handler({ values, fileManager });
  await rm.handler({ values: [result.oldPath], fileManager: fileManager });
  return result;
};

const mvOutput = (result) => {
  console.log(`File ${result.oldPath} moved to ${result.newPath}`);
};

const mv = new BaseOperation("mv", mvHandler, mvOutput);
export { mv as default };
