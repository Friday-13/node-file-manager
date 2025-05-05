import path from "node:path";
import resolvePath from "./resolve-path.js";
import fs from "node:fs/promises";

const resolveDestinationPath = async (rawPath, currentDir, currentFilePath) => {
  let resolvedPath = resolvePath(rawPath, currentDir);
  try {
    const stat = await fs.stat(resolvedPath);
    if (stat.isDirectory()) {
      resolvedPath = path.join(resolvedPath, path.basename(currentFilePath));
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  return resolvedPath;
};

export { resolveDestinationPath as default };
