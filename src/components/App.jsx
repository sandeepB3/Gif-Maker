import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Spacing from "./Spacing";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(true);  //originaly false but chrome broswer not letting byte code run 
  const [video, setVideo] = useState(); //Video file state initially not defined 
  const [gif, setGif] = useState();

  const load = async function() {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(function() {
    load();
  }, [])

  async function convertToGif() {
    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url)
  }

  function fileAdded(event) { 
    setVideo(event.target.files?.item(0))
  }

  return ready ? (

    <div className="App">
    <Header />
    <Spacing />
     { video && <video controls width="350" src={URL.createObjectURL(video)}> </video>}  
      <input type="file" onChange={fileAdded} />

      <Spacing />
      <h3>Result</h3>
      <button onClick={convertToGif}>Convert</button>

      { gif && <img src={gif} width="250" alt="gifimge" />}

      <Footer />
    </div>
  ) : (<p style={{textAlign: "center", paddingTop: "100px"} }>Loading....</p>);
}

export default App;