import * as glob from "glob";
import path from "path";
import { compareWindowsFilePaths } from "./sortfn.js";
import { NavigationBar } from "./const.js";

/**
 * 生成目录树
 * @param {string} directoryPath - 目录路径
 * @returns {Array} - 目录树结构
 */
function generateDirectoryTree(directoryPath) {
  const tree = [];

  const files = glob.sync(directoryPath + "/**/*.md");

  files.sort(compareWindowsFilePaths);

  for (const file of files) {
    const relativePath = path.relative(directoryPath, file);
    const parts = relativePath.split(path.sep);

    let currentNode = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const existingNode = currentNode.find((node) => node.text === parts[i]);

      if (existingNode) {
        currentNode = existingNode.items;
      } else {
        const newNode = {
          text: parts[i],
          items: [],
        };
        currentNode.push(newNode);
        currentNode = newNode.items;
      }
    }

    const fileName = path.basename(file, ".md");
    currentNode.push({
      text: fileName,
      // replace \\ 为了让 上一页 和 下一页 能够识别
      link: "/" + file.replace(".md", "").replace(/\\/g, "/"),
    });
  }

  return tree;
}

export const sidebar = NavigationBar.filter((item) => {
  return item.path;
}).reduce((accumulator, key) => {
  accumulator[`/${key.path}/`] = generateDirectoryTree(key.path);
  return accumulator;
}, {});

/**
 * 获取目录树中第一个叶子节点的链接
 * @param {Array} treeArr - 目录树数组
 * @returns {string} - 第一个叶子节点的链接，如果没有叶子节点则返回空字符串
 */
function getFirstItemLink(treeArr) {
  let firstitem = treeArr[0];
  if (firstitem && !firstitem.items) {
    return firstitem.link;
  }

  return getFirstItemLink(firstitem.items);
}

export const nav = NavigationBar.map((item) => {
  if (item.link) {
    return item;
  }
  return {
    ...item,
    link: getFirstItemLink(sidebar[`/${item.path}/`]),
  };
});
