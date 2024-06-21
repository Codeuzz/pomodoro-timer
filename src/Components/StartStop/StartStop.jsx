import './StartStop.css';
import { useRef } from 'react';

function StartStop({started, setStarted, timeFinished}) {
  const FinishedAudio = useRef(null);
  const clickAudio = useRef(null);

  if(timeFinished) {
    FinishedAudio.current.currentTime = 0;
    FinishedAudio.current.play();
  }

  const changeStarted = () => {
    clickAudio.current.currentTime = 0;
    clickAudio.current.play();
    return setStarted(prev => !prev)
  }
    return(
           <button id='start_stop' onClick={changeStarted}>
             <i className={`fa-solid ${started ? 'fa-pause' : 'fa-play'}`}></i>
             <audio ref={FinishedAudio} id='finish-audio' src='./src/assets/finished-ring.mp3'></audio>
             <audio ref={clickAudio} id='finish-audio' src='./src/assets/click-sound.wav'></audio>

           </button>
    )
}

export default StartStop