import BaseOperation from "../base-operation.js";

const catHandler = async ({ values: values, fileManager }) => {
  console.log('cathandler');
};

const catOutput = () => {
  console.log('cat output');
};

const cat = new BaseOperation("cat", catHandler, catOutput);
export { cat as default };
