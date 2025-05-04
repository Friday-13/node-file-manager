import OperationError from "../../utils/operation-error.js";
import BaseOperation from "../base-operation.js";

const cdHandler = async ({ values: values, fileManager }) => {
  try {
    await fileManager.setWorkDir(values[0]);
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const cdOutput = () => {};

const cd = new BaseOperation("cd", cdHandler, cdOutput);
export { cd as default };
