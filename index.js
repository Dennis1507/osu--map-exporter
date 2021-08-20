const fs = require('fs');
const path = require('path');
const { zip } = require('zip-a-folder');

const dir = '\osu!\\Songs'; //osu songs path here

const exportdir = './maps/';

let progress = 0;

fs.readdir(dir, async function(err, files) {
    const amount = files.length;
    if (err) throw err;
    for (const file of files) {
        const filepath = path.join(dir, file);
        await new Promise((resolve, reject) => {
            fs.stat(filepath, async function(err, stats) {
                if (err) reject();
                if (stats.isDirectory()) {
                    await zip(filepath, `${exportdir}${file}.osz`);
                    progress++;
                    console.log(`${progress} / ${amount} | ${file}`);
                    resolve();
                }
            });
          });
    };
});