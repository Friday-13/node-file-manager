import BaseOperation from "../base-operation.js";
import fs from "node:fs/promises";
import path from "node:path";

const typePriority = {
  directory: 0,
  file: 1,
  symlink: 2,
  other: 3,
};

const getFileType = (stat) => {
  if (stat.isFile()) {
    return "file";
  }
  if (stat.isDirectory()) {
    return "directory";
  }
  if (stat.isSymbolicLink()) {
    return "symlink";
  }
  return "other";
};

const contentSort = (itemA, itemB) => {
  const [nameA, typeA] = itemA;
  const [nameB, typeB] = itemB;

  const typeOrder = typePriority[typeA] - typePriority[typeB];
  const nameOrder = nameA.localeCompare(nameB);

  if (typeOrder === 0) {
    return nameOrder;
  }
  return typeOrder;
};

const lsHandler = async ({ fileManager }) => {
  const files = await fs.readdir(fileManager.workDir);
  const contentPromises = files.map(async (file) => {
    const filePath = path.join(fileManager.workDir, file);
    const fileType = await fs.stat(filePath);
    return [file, getFileType(fileType)];
  });
  const content = await Promise.all(contentPromises);
  const sortedContent = content
    .sort(contentSort)
    .map((item) => ({ Name: item[0], Type: item[1] }));
  return sortedContent;
};

const lsOutput = (result) => {
  console.table(result);
};

const ls = new BaseOperation("ls", lsHandler, lsOutput);
export { ls as default };
