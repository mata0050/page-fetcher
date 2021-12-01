const { argv } = require('process');
const request = require('request');
const fs = require('fs');

const URL = argv[2];
const localFilePath = argv[3];

if (!URL || !localFilePath) {
  console.log('Please enter two arguments');
}

// download file and save in index.html

const downloadHTML = (url, filepath) => {
  request
    .get(url)

    // We will throw an error and log it if we experience an issue.
    .on('error', function (err) {
      throw err;
    })

    // Let's tell the user html finishes downloading to our local file system.
    .on('end', function () {
      // get file size
      fs.stat(filepath, (err, stats) => {
        if (err) {
          console.log(`File doesn't exist.`);
        } else {
          console.log();
          console.log(
            ` Downloaded and saved ${stats.size} bytes to ./index.html.`
          );
        }
      });
    })

    // This downloads the image to the file path we specify.
    .pipe(fs.createWriteStream(filepath));

  // const fileStats = fs.stat(localFilePath);
  // const fileSize = fileStats.size;
};

downloadHTML(URL, localFilePath);
