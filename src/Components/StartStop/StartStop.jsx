import './StartStop.css';
import { useRef, forwardRef } from 'react';

const StartStop = forwardRef(({started, setStarted}, ref) => {
  const clickAudio = useRef(null);


  const changeStarted = () => {
    clickAudio.current.currentTime = 0;
    clickAudio.current.play();
    return setStarted(prev => !prev);
  }

    return(
           <button id='start_stop' onClick={changeStarted}>
             <i className={`fa-solid ${started ? 'fa-pause' : 'fa-play'}`}></i>
             <audio ref={ref} id='finish-audio' src='./src/assets/finished-ring.mp3'></audio>
             <audio ref={clickAudio} id='finish-audio' src='./src/assets/click-sound.wav'></audio>
           </button>
    )
})

export default StartStop