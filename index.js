/* eslint-disable no-console */
const { initSocat } = require('./socat.js');
const { initKh4server } = require('./kh4server');

(async () => {
  const { socat, tty1, tty2 } = await initSocat();
  initKh4server(tty2);

  console.log({ tty1, tty2 });
  console.log('KILL!');
  socat.kill('SIGHUP');
})();
