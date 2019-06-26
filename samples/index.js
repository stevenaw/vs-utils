/*
  A script to run individual sample apps
  npm run demo {demoName}

  demoName maps to a file other than index.js in the directory root
  Omitting demoName will run all samples
*/
const fs = require('fs');
const path = require('path');

const currentDirectory = __dirname;
const currentFile = path.basename(__filename);

const args = process.argv.slice(2);
const requestedSample = args[0];

fs.readdir(currentDirectory, (err, files) => {
  const siblings = files.filter(file => file !== currentFile);
  const allSamples = siblings.filter(file => {
    const fullPath = path.join(currentDirectory, file);
    const stats = fs.lstatSync(fullPath);

    return stats.isFile();
  }).map(file => path.parse(file).name);

  const samplesToRun = requestedSample ? allSamples.filter(sample => sample == requestedSample) : allSamples;
  samplesToRun.forEach(sample => {
    require(`./${sample}`);
  });
});