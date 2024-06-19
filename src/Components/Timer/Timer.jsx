import { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    // MINUTE is adding 2 by 2
    const addingTime = () => {
        setSecond(prevS => {
            if(prevS === 9) {
                setMinute(prevM => {
                    if(prevM === 9) {
                        setHour(prevH => prevH + 1)
                        return 0;
                    }
                   return prevM + 1;
                })
                return 0;
            }
           return prevS + 1;
        })
    }

    useEffect(() => {
        const timer = setInterval( addingTime , 1000);
        
        return () => clearInterval(timer)
    }, [])

    return(
        <div id='timer'>
           <h1 id='timer-label'>Session</h1>
           <span id="time-left">{hour}:{minute}:{second}</span>
        </div>
    )
}


export default Timer