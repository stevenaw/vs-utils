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

  if (requestedSample) {
    const samplesToRun = requestedSample == 'all' ? 
                          allSamples :
                          allSamples.filter(sample => sample == requestedSample);

    if (!samplesToRun.length) {
      console.log('Sample not found.');
      promptForSpecifiedSample(allSamples);
    } else {
      samplesToRun.forEach(sample => {
        require(`./${sample}`);
      });
    }
  } else {
    console.log('No sample chosen.');
    promptForSpecifiedSample(allSamples);
  }
});

const promptForSpecifiedSample = (samples) => {
  console.log('Please run a sample in the format \'npm run demo {name}\'. Options are:');
  samples.forEach(sample => {
    console.log(`  ${sample}`);
  });
  console.log('Or run \'npm run demo all\' to run all');
}