/* eslint-disable no-console */
const { initSocat } = require('./socat.js');
const { initKh4server } = require('./kh4server');
const { sleep } = require('./sleep');

(async () => {
  const { socat, tty } = await initSocat((line) => {
    console.log(`port: ${line}`);
  });
  const kh4server = initKh4server(tty);

  const kh4 = socat.stdin;
  kh4.write('B\n');
  await sleep(2);

  kh4.write('G\n');
  await sleep(2);

  kh4.write('D,100,-100\n');
  await sleep(2);

  kh4.write('D,0,0\n');
  await sleep(2);

  kh4server.kill('SIGTERM');
  socat.kill('SIGTERM');
})();
