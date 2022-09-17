const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
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

app.get('/api/phaser', (req, res) => {
  io.of('/').emit('phaser');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/wah', (req, res) => {
  io.of('/').emit('wah');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/reverb', (req, res) => {
  io.of('/').emit('reverb');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/tremolo', (req, res) => {
  io.of('/').emit('tremolo');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/chorus', (req, res) => {
  io.of('/').emit('chorus');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/vibrato', (req, res) => {
  io.of('/').emit('vibrato');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/trigger', (req, res) => {
  io.of('/').emit('trigger');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/slower', (req, res) => {
  io.of('/').emit('slower');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/faster', (req, res) => {
  io.of('/').emit('faster');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/airhorn', (req, res) => {
  io.of('/').emit('airhorn');
  res.send({ express: 'Hello From Express' });
});

app.get('/api/pingpong', (req, res) => {
  io.of('/').emit('pingpong');
  res.send({ express: 'Hello From Express' });
})


const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
