/* eslint-disable no-console */
const { spawn } = require('child_process');

exports.initSocat = function initSocat() {
  return new Promise((resolve, reject) => {
    const socat = spawn('socat', ['-d', '-d', 'pty,raw,echo=0', 'pty,raw,echo=0']);
    let tty1;
    let tty2;

    socat.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    socat.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      const device = data.toString().split(' ').filter((str) => str.includes('dev')).join();
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
