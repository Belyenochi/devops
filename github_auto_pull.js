/*
    auther: Jason Tomas
    nodeVersion: v10.15.3
    npmVersion: v6.4.1
*/

const http = require('http');
const crypto = require('crypto');

const secret = "Your webhook scret";
const repo = "Your repo PATH (example : ~/xxx)";
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            console.log("start pull...")
            exec('cd ' + repo + ' && git pull ', (error, stdout, stderr) => {
            if (error) {
              console.error(`执行出错: ${error}`);
              return;
            }
        });
    }});

    res.end();
}).listen(8080);
