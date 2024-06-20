import { useState, useEffect } from 'react';
import './Timer.css';

function Timer({wantedTime}) {

    const seconds = wantedTime % 60;
    const minutes = Math.floor(wantedTime / 60);
    
    return (
        <div id='timer'>
            <h1 id='timer-label'>Session</h1>
            <span id="time-left">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
    );
}


export default Timer