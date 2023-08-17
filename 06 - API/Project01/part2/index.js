const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);

const port = 2000;

server.listen(port, console.log(`server ${port} is running now`));
// https://localhost/2000 => it will load