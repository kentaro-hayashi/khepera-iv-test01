/* eslint-disable no-console */
const { spawn } = require('child_process');
const readline = require('readline');

exports.initSocat = function initSocat() {
  return new Promise((resolve, reject) => {
    const socat = spawn('socat', ['-d', '-d', 'pty,raw,echo=0', 'pty,raw,echo=0']);
    let tty1;
    let tty2;

    socat.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    const rl = readline.createInterface(socat.stderr, {});
    rl.on('line', (line) => {
      console.log(`stderr: ${line}`);
      const device = line.toString().split(' ').filter((str) => str.includes('dev')).join();
      if (device === '') {
        return;
      }
      if (tty1 == null) {
        tty1 = device;
        console.log('tty1 set');
      } else if (tty2 == null) {
        tty2 = device;
        console.log('tty2 set');
        resolve({ socat, tty1, tty2 });
      }
    });

    socat.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
};
