import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);
    const [timeFinished, setTimeFinished] = useState(false);
    const [seshTime, setSeshTime] = useState(1500);
    const [wantedBreakTime, setWantedBreakTime] = useState(300);
    const [breakTime, setBreakTime] = useState(300);

    const incrementSesh = () => {
        setWantedTime(prevTime => prevTime + 60);
        setSeshTime(prevTime => prevTime + 60)
    }

    const decrementSesh = () => {
        setWantedTime(prevTime => prevTime - 60);
        setSeshTime(prevTime => prevTime - 60)
    }

    const incrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime + 60);
        setBreakTime(prevTime => prevTime + 60)

    }
    const decrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime - 60);
        setBreakTime(prevTime => prevTime - 60)
    }

    const startBreak = () => {
        if(timeFinished) {
            setWantedBreakTime(prevTime => prevTime - 1);
        }
    }

    const startCountDown = () => {
        if(started) {
            setWantedTime(prevTime => {
                if(prevTime === 0) {
                    setTimeFinished(!timeFinished);
                    // startBreak() ??? 
                    return 0;
                } else {
                   return prevTime - 1
                }
            });
        } 
    }

    useEffect(() => {
        console.log("Setting interval");
                const timer = setInterval(() => {
                    startCountDown()
                }, 1000);   
                
        return () => {
            console.log("Clearing interval");
            clearInterval(timer);
        };
    }, [started]);

    


    return(
        <div id='app-container'>
            <Timer wantedBreakTime={wantedBreakTime} wantedTime={wantedTime} />
            <Buttons started={started} setStarted={setStarted} timeFinished={timeFinished} />
            <Parameters  
                seshTime={seshTime} 
                wantedTime={wantedTime}  
                incrementSesh={incrementSesh} 
                decrementSesh={decrementSesh}
                incrementBreak={incrementBreak}
                decrementBreak={decrementBreak}
                breakTime={breakTime}
            />

        </div>
    )
}


export default Container