/* eslint-disable no-console */
const { spawn } = require('child_process');

exports.initKh4server = (tty) => {
  const kh4server = spawn('/home/root/kh4server', [tty]);

  kh4server.stderr.on('data', (data) => {
    console.log(`kh4server: ${data}`);
  });

  kh4server.stdout.on('data', (data) => {
    console.log(`kh4server: ${data}`);
  });

  kh4server.on('close', (code) => {
    console.log(`kh4server exited with code ${code}`);
  });
  console.log('kh4server ready');
  return kh4server;
};
