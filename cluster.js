const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { CLIENT_RENEG_LIMIT } = require('tls');
const PORT = 5555;

const numCPUs = os.cpus().length-2;
console.log(numCPUs)

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  app.get('/compute', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e10; i++) sum += i;
    res.send(`Sum is ${sum} from worker ${process.pid}`);
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
