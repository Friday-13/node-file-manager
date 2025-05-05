import BaseOperation from "../base-operation.js";
import OperationError from "../../utils/operation-error.js";
import os from "node:os";

const eol = () => {
  return JSON.stringify(os.EOL);
};

const cpus = () => {
  const allInfo = os.cpus();
  const amount = allInfo.length;
  const summary = allInfo.map((value) => ({
    model: value.model,
    speed: `${value.speed / 1000}GHz`,
  }));
  return { "amount of CPUs": amount, "CPUs info": summary };
};

const homedir = () => {
  return os.homedir();
};

const username = () => {
  return os.userInfo().username;
};

const architecture = () => {
  return os.arch();
};

const operationArgs = {
  "--EOL": eol,
  "--cpus": cpus,
  "--homedir": homedir,
  "--username": username,
  "--architecture": architecture,
};

const osHandler = async ({ values }) => {
  try {
    const arg = values[0];
    const handler = operationArgs[arg];
    if (handler === undefined) throw new OperationError("Incorrect argument");
    return handler();
  } catch (err) {
    throw new OperationError(err.message);
  }
};

const osOutput = (result) => {
  console.log(result);
};

const osOperation = new BaseOperation("os", osHandler, osOutput);
export { osOperation as default };
