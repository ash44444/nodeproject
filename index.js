const chokidar = require('chokidar');

const { spawn } = require('child_process');

const { program } = require('commander');



program

  .option('-e, --ext [extensions]', 'Watch extensions', 'js')

  .parse(process.argv);



const watchedExtensions = program.opts().ext.split(',');



const watchDir = process.cwd(); // Current working directory



const watcher = chokidar.watch(watchDir, {

  ignored: /node_modules/,

  persistent: true,

});



console.log(`Watching directory ${watchDir} for changes..`);



let runningProcess;



watcher.on('change', (path) => {

  if (runningProcess) {

    console.log('Restarting application...');

    runningProcess.kill();

  }



  runningProcess = spawn('node', ['index.js'], {

    stdio: 'inherit',

  });

});
