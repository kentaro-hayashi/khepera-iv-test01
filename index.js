/* eslint-disable no-console */
const { spawn } = require('child_process');
const { initSocat } = require('./socat.js');

(async () => {
  const { socat, tty1, tty2 } = await initSocat();
  console.log({ tty1, tty2 });
  console.log('KILL!');
  socat.kill('SIGHUP');
})();
