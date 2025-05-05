import path from "node:path";

const resolvePath = (rawPath, currentDir) => {
  const formatedPath = path.normalize(rawPath);
  if (path.isAbsolute(formatedPath)) {
    return formatedPath;
  }
  const absolutePath = path.join(currentDir, formatedPath);
  return path.normalize(absolutePath);
};

export { resolvePath as default };
