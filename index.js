/* eslint-disable no-console */
const { initSocat } = require('./socat.js');
const { initKh4server } = require('./kh4server');
const { initKh4port } = require('./kh4port');
const { sleep } = require('./sleep');

(async () => {
  const { socat, tty1, tty2 } = await initSocat();
  const kh4server = initKh4server(tty2);
  const port = initKh4port(tty1, (line) => {
    console.log(`port: ${line}`);
  });

  port.write('B\n');
  await sleep(3);

  port.close();
  kh4server.kill('SIGHUP');
  socat.kill('SIGHUP');
})();
