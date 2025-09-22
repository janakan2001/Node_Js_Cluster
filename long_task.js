function highCompute() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum++
    }
    return sum
}

process.on('message',(message)=>{
    if(message == "start")
    {
        const sum = highCompute();
        console.log(process.pid," Inside Child process");
        process.send(sum)
    }
})