const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { Console } = require('console');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = http.createServer(app);

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

// { "octaves": [3, 5]}
app.post('/api/phaser', (req, res) => {
  console.log(req.body);
  io.of('/').emit('phaser', req.body);
  res.send({ applied: 'phaser' });
});

app.post('/api/wah', (req, res) => {
  io.of('/').emit('wah', req.body);
  res.send({ applied: 'wah' });
});

// { "delay": [1, 10.]"}
app.post('/api/reverb', (req, res) => {
  io.of('/').emit('reverb', req.body);
  res.send({ applied: 'reverb' });
});

app.post('/api/tremolo', (req, res) => {
  io.of('/').emit('tremolo', req.body);
  res.send({ applied: 'tremolo' });
});

app.post('/api/chorus', (req, res) => {
  io.of('/').emit('chorus', req.body);
  res.send({ applied: 'chorus' });
});

app.post('/api/vibrato', (req, res) => {
  io.of('/').emit('vibrato', req.body);
  res.send({ applied: 'vibrato' });
});

// { "pace": [-0.5, 0.5] }
app.post('/api/pace', (req, res) => {
  io.of('/').emit('pace', req.body);
  res.send({ applied: 'pace' });
});

// no payload
app.post('/api/airhorn', (req, res) => {
  io.of('/').emit('airhorn');
  res.send({ applied: 'airhorn' });
});

app.post('/api/pingpong', (req, res) => {
  io.of('/').emit('pingpong', req.body);
  res.send({ applied: 'pingpong' });
})


const PORT = process.env.PORT || 5000;
const SPORT = process.env.SPORT || 5001;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
