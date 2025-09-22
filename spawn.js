const {spawn} = require('child_process');


const child = spawn('find',['/']);

child.stdout.on('data',(data)=>{
    console.log(`stdout : ${data}`);
})

child.stderr.on('data',(data)=>{
    console.log(`stderr : ${data}`);
})

child.stderr.on('error',(data)=>{
    console.log(`error : ${data}`);
})



