import logo from "./logo.svg";
import "./App.css";
import "nes.css/css/nes.min.css";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const [playing, setPlaying] = useState(undefined);

  const videoRef = useRef(null);

  useEffect(() => {
    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    });
  }, []);

  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Webcam Test</p>
      </header>
      <section className="section">
        <video ref={videoRef} autoPlay className="video" />

        <div class="nes-container is-rounded">
          <p>
            Welcome! <br />
            Press "START" when you want to turn on the camera <br />
            and "STOP" when you want to stop.
          </p>
        </div>

        {/* <a class="nes-btn" href="#">
          Normal
        </a> */}

        <button
          type="button"
          class="nes-btn is-primary"
          onClick={() => startOrStop()}
        >
          {playing ? "STOP" : "START"}
        </button>

        <label class="nes-btn">
          <span>Select your file</span>
          <input type="file" />
        </label>
      </section>
    </div>
  );
}

export default App;
