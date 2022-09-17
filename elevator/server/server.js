const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');

var key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = http.createServer(options, app);
const httpsServer = https.createServer(options, app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});


io.use(function(socket, next){
  next();
});

app.use(function(req, res, next){
    res.io = io;
    next();
});

io.on('connection', (socket) => {
  socket.io = io;
});

app.post('/api/phaser', (req, res) => {
  io.of('/').emit('phaser');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/wah', (req, res) => {
  io.of('/').emit('wah');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/reverb', (req, res) => {
  io.of('/').emit('reverb');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/tremolo', (req, res) => {
  io.of('/').emit('tremolo');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/chorus', (req, res) => {
  io.of('/').emit('chorus');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/vibrato', (req, res) => {
  io.of('/').emit('vibrato');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/trigger', (req, res) => {
  io.of('/').emit('trigger');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/slower', (req, res) => {
  io.of('/').emit('slower');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/faster', (req, res) => {
  io.of('/').emit('faster');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/airhorn', (req, res) => {
  io.of('/').emit('airhorn');
  res.send({ express: 'Hello From Express' });
});

app.post('/api/pingpong', (req, res) => {
  io.of('/').emit('pingpong');
  res.send({ express: 'Hello From Express' });
})


const PORT = process.env.PORT || 5000;
const SPORT = process.env.SPORT || 5001;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
httpsServer.listen(SPORT, () => console.log(`Listening on port ${SPORT}`));
