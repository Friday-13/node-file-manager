import BaseOperation from "../base-operation.js";

const cdHandler = async ({ values: values, fileManager }) => {
  await fileManager.setWorkDir(values[0]);
};

const cdOutput = () => {};

const cd = new BaseOperation("cd", cdHandler, cdOutput);
export { cd as default };
