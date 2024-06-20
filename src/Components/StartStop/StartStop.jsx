import './StartStop.css';
import { useRef } from 'react';

function StartStop({started, setStarted}) {

  const changeStarted = () => {
    return setStarted(prev => !prev)
  }
    return(
           <button id='start_stop' onClick={changeStarted}>
             <i className={`fa-solid ${started ? 'fa-pause' : 'fa-play'}`}></i>
           </button>
    )
}


export default StartStop