import BaseOperation from "../base-operation.js";
import cd from "./cd.js";

const upHandler = async ({ fileManager }) => {
  await cd.handler({ values: [".."], fileManager: fileManager });
};

const upOutput = cd.output;

const up = new BaseOperation("up", upHandler, upOutput);
export { up as default };
