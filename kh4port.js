/* eslint-disable no-console */
const SerialPort = require('serialport');

exports.initKh4port = (tty, onData) => {
  const port = new SerialPort(tty, {
    parser: SerialPort.parsers.readline('\n'),
    baudrate: 9600,
  });

  port.on('data', (data) => {
    console.log(`port: ${data}`);
    onData(data);
  });

  port.on('error', (e) => {
    console.error(e);
  });


  port.on('close', () => {
    console.log('port closed');
  });

  console.log('serialport ready');
  return port;
};
