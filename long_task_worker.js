const { parentPort } = require("worker_threads");

parentPort.on("message", (msg) => {
  if (msg === "start") {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) sum++;

    console.log(process.pid ," inside Worker process");

    parentPort.postMessage(sum);
  }
});
