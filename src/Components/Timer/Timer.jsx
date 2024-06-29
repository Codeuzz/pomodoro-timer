
import './Timer.css';

function Timer({wantedTime, wantedBreakTime, totalSesh, timeFinished}) {

    const secondsSesh = wantedTime % 60;
    const minutesSesh = Math.floor(wantedTime / 60);

    const secondsBreak = wantedBreakTime % 60;
    const minutesBreak = Math.floor(wantedBreakTime / 60);
    
    return (
        <div id='timer'>
            <h1 id='timer-label'>
                {!timeFinished ? 'Session ' + totalSesh : 'Break ' + totalSesh} 

            </h1>
            <span id="time-left">
                {!timeFinished
                    ? `${String(minutesSesh).padStart(2, '0')}:${String(secondsSesh).padStart(2, '0')}`
                    : `${String(minutesBreak).padStart(2, '0')}:${String(secondsBreak).padStart(2, '0')}`}
            </span>
        </div>
    );
}


export default Timer