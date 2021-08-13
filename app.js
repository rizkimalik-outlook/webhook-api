const express = require('express');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function createLog(props) {
    const dir = './logs';
    const file = Date.now();

    !fs.existsSync(dir) && fs.mkdirSync(dir);
    fs.writeFile(dir+'/'+file+'.txt', JSON.stringify(props), function (err) {
        if (err) throw err;
        console.log(`${file}.txt : saved.`);
    }); 
}

app.get('/', (req, res) => {
    res.json("Aplikasi REST API ku berjalan!");
});

app.post('/webhook-api', (req, res) => {
    // console.log(req.body);
    createLog(req.body);
    res.json(req.body);
});

server.listen(port, function () {
    console.log('App running on *: ' + port);
});