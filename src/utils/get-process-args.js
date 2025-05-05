import { argv } from "node:process";

const getProcessArgs = () => {
  const args = argv.slice(2).reduce((map, currentArg) => {
    if (currentArg.startsWith("--")) {
      const [key, value] = currentArg.slice(2).split("=");
      map.set(key, value);
      return map;
    }
  }, new Map());
  return args;
};

export { getProcessArgs };
