import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import * as Tone from 'tone';

function App() {

  const ENDPOINT = 'http://localhost:5000/';

  const socket = io.connect(ENDPOINT);
  const player = new Tone.Player({url: process.env.PUBLIC_URL + 'music_sample.mp3', loop: true}).toDestination();

  const airhorn_player = new Tone.Player({url: process.env.PUBLIC_URL + 'dj_airhorn.mp3', loop: false}).toDestination();
  airhorn_player.volume.value = -6;

  socket.on('connect', () => {
    console.log("Connected")
  });
  
  socket.on('phaser', (req) => {
    const phaser = new Tone.Phaser(req).toDestination();
    console.log(req);
    // const phaser = new Tone.Phaser({
    //   "frequency" : 15,
    //   "octaves" : 5,
    //   "baseFrequency" : 1000
    // }).toDestination();
    //connect a player to the distortion
    player.connect(phaser);
    console.log("Adding phaser...");
  });

  socket.on('wah', (req) => {
    const autoWah = new Tone.AutoWah(req).toDestination();
    //connect a player to the distortion
    player.connect(autoWah);
    console.log("Adding autowah...");
  });

  socket.on('reverb', (req) => {
    const reverb = new Tone.Reverb(req.decay).toDestination();
    player.connect(reverb);
    console.log("Adding reverb...");
  });

  socket.on('vibrato', (req) => {
    const vibrato = new Tone.Vibrato(req).toDestination();
    player.connect(vibrato);
    console.log("Adding vibrato...");
  });

  socket.on('tremolo', (req) => {
    const tremolo = new Tone.Tremolo(req).toDestination();
    player.connect(tremolo);
    console.log("Adding tremolo...");
  });

  socket.on('chorus', (req) => {
    const chorus = new Tone.Chorus(req).toDestination();
    player.connect(chorus);
    console.log("Adding chorus...");
  });

  socket.on('slower', (req) => {
    player.playbackRate = player.playbackRate - req.rate;
    console.log("Slowing the playback rate...")
  });

  socket.on('faster', (req) => {
    player.playbackRate = player.playbackRate + req.rate;
    console.log("Making the playback rate faster...")
  });

  socket.on('airhorn', () => {
    airhorn_player.start();
  });

  socket.on('pingpong', (req) => {
    const pingPong = new Tone.PingPongDelay(req).toDestination();
    player.connect(pingPong);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <button className="square" onClick={() => {Tone.context.resume().then(() => {
          player.start();
        })}}> */}
        <button className="square" onClick={() => { Tone.context.resume().then(() => {
              player.start();
            })}}>
          Play music
        </button>
      </header>
    </div>
  );
}

export default App;
