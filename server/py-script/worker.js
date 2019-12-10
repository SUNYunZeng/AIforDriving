const child_process = require('child_process');
const config = require('./py-config');
const python_path = config.python_path;
const model_path = config.model_path;

let listen = function (pre_traj, user) {

  const config = [python_path, pre_traj, model_path+user+'.pth'];
  return new Promise(function (resolve, reject) {
    const workerProcess = child_process.spawn('python', config);
    workerProcess.stdout.on('data', function (data) {
      resolve(data.toString('utf8'));
    });
    workerProcess.stderr.on('data', data => reject('' + data));
  });

};

module.exports = {
  listen: listen
};
