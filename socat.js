/* eslint-disable no-console */
const { spawn } = require('child_process');
const readline = require('readline');

exports.initSocat = (onData) => new Promise((resolve) => {
  const socat = spawn('socat', ['-d', '-d', 'pty,raw,echo=0', '-']);
  let tty;

  const readlineOut = readline.createInterface(socat.stdout, {});
  readlineOut.on('line', (line) => {
    onData(line);
  });

  const readlineErr = readline.createInterface(socat.stderr, {});
  readlineErr.on('line', (line) => {
    console.log(`socat: ${line}`);
    if (line.toString().includes('starting')) {
      console.log('socat ready');
      resolve({ socat, tty });
      return;
    }

    const device = line.toString().split(' ').filter((str) => str.includes('dev')).join();
    if (device === '') {
      return;
    }
    tty = device;
  });

  socat.on('close', (code) => {
    console.log(`socat exited with code ${code}`);
  });
});
