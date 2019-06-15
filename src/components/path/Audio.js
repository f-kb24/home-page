import React, { useRef, useState } from "react"
import audio from "../../audio/make.mp3"
import "./path.css"
import WaveForm from "./WaveForm"

const Audio = ({ fullpageApi }) => {
  const [audioSet, setAudioSet] = useState(false)
  const [analyser, setAnalyser] = useState(null)
  const audioRef = useRef(null)

  const initializeAudio = () => {
    let context = new AudioContext()
    let analyser = context.createAnalyser()
    let audioSrc = context.createMediaElementSource(audioRef.current)
    audioSrc.connect(analyser)
    analyser.connect(context.destination)
    analyser.fftSize = 512
    setAnalyser(analyser)
  }

  const play = () => {
    if (!audioSet) {
      initializeAudio()
      setAudioSet(true)
    }
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  return (
    <div className="section">
      <div className="container">
        <div className="item_container">
          <audio ref={audioRef} id="audioElement" src={audio} />
          <WaveForm analyser={analyser} />
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
        </div>
      </div>
    </div>
  )
}

export default Audio
