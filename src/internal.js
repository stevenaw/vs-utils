'use strict';

const fs = require('fs');

const getFileContentsOrFailSync = (file) => {
  if (!fileExistsSync(file)) {
    throw new Error('File not found: ' + file);
  }

  const input = fs.readFileSync(file, { encoding: 'utf-8' });

  return input;
}

const fileExistsSync = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

module.exports = {
  getFileContentsOrFailSync,
  fileExistsSync
};