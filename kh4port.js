/* eslint-disable no-console */
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

exports.initKh4port = (tty, onData) => {
  const port = new SerialPort(tty, {
    baudRate: 9600,
  });

  port.on('error', (e) => {
    console.error(e);
  });

  const parser = port.pipe(new Readline());
  parser.on('data', (line) => {
    onData(line);
  });

  port.on('close', () => {
    console.log('port closed');
  });

  console.log('serialport ready');
  return port;
};
