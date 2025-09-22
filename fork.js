const express = require("express");
const { fork } = require('child_process')
const { Worker } = require('worker_threads')


const app = express();
const PORT = 3009;

app.get("/test",(req,res)=>{
    res.send({message:"Test message"})
})

app.get("/one", (req, res) => {
    let sum = highCompute()
    res.send({ sum });
});

app.get("/two", async (req, res) => {
    let sum = await highComputeAsync()
    res.send({ sum });
});

app.get("/three", async (req, res) => {
    console.log(process.pid," Inside the main server");
    const child = fork('./long_task.js');
    child.send('start');
    child.on('message', (sum) => {
        res.send({ sum })
    })
});

app.get("/four", (req, res) => {
    console.log(process.pid);
    const worker = new Worker("./long_task_worker.js");
    worker.postMessage("start");
    worker.on("message", (sum) => {
        res.send({ sum });
    });
    worker.on("error", (err) => {
        res.status(500).send({ error: err.message });
    });
});

function highCompute() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum++
    }
    return sum
}


function highComputeAsync() {
    return new Promise((resolve, reject) => {
        let sum = 0;
        for (let i = 0; i < 10e9; i++) {
            sum++
        }
        resolve(sum)
    })
}

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
