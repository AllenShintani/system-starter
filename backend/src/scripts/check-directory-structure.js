#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const checkDirectoryStructure = (dir, basePath = "") => {
  const items = fs.readdirSync(dir);
  const files = [];
  const subdirs = [];

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      subdirs.push(item);
    } else if (stat.isFile() && !item.startsWith(".")) {
      files.push(item);
    }
  });

  if (files.length >= 10 && subdirs.length === 0) {
    console.error(
      `Error: Directory "${basePath || dir}" has ${
        files.length
      } files with no subdirectories. Please organize files into subdirectories.`
    );
    process.exit(1);
  }

  subdirs.forEach((subdir) => {
    const subdirPath = path.join(dir, subdir);
    const relativePath = basePath ? path.join(basePath, subdir) : subdir;
    checkDirectoryStructure(subdirPath, relativePath);
  });
};

const srcPath = path.join(__dirname, "../src");
if (fs.existsSync(srcPath)) {
  checkDirectoryStructure(srcPath, "src");
  console.log("Directory structure check passed!");
} else {
  console.error("src directory not found");
  process.exit(1);
}
