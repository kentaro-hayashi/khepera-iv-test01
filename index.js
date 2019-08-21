const child_process = require('child_process');

const subprocess = child_process.spawn('ls');
subprocess.on('message', (data) => {
  console.log(data);
});
