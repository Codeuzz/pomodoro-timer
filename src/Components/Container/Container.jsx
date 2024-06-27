import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect, useRef } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);
    const [timeFinished, setTimeFinished] = useState(false);
    const [seshTime, setSeshTime] = useState(1500);
    const [wantedBreakTime, setWantedBreakTime] = useState(300);
    const [breakTime, setBreakTime] = useState(300);
    const FinishedAudio = useRef(null);
    const [totalSesh, setTotalSesh] = useState(0)

    const incrementSesh = () => {
        setWantedTime(prevTime => prevTime === 3600 ? 3600 : prevTime + 60);
        setSeshTime(prevTime => prevTime === 3600 ? 3600 : prevTime + 60)
    }

    const decrementSesh = () => {
        setWantedTime(prevTime => prevTime === 0 ? 0 : prevTime - 60);
        setSeshTime(prevTime => prevTime === 0 ? 0 : prevTime - 60)
    }

    const incrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime === 3600 ? 3600 : prevTime + 60);
        setBreakTime(prevTime => prevTime === 3600 ? 3600 : prevTime + 60)

    }
    const decrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime === 0 ? 0 : prevTime - 60);
        setBreakTime(prevTime => prevTime === 0 ? 0 : prevTime - 60)
    }
    const resetEverything = () => {
        setWantedTime(1500);
        setSeshTime(1500);
        setWantedBreakTime(300);
        setBreakTime(300)
        setStarted(false)
    }

    const startBreak = () => {
        if(timeFinished && started) {
            setWantedBreakTime(prevTime => {
                if(prevTime === 0) {
                    setTotalSesh(prev => prev + 1) // GOING FROM 0 TO 2 FIX SO THAT GOING FROM 1 TO 2
                    setStarted(false)
                    setTimeFinished(!timeFinished);
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    console.log('time finished : ', timeFinished);
                    resetEverything()
                    return 0;
                } else {
                   return prevTime - 1
                }
            });
        }
    }

    const startCountDown = () => {
        if(started && !timeFinished) {
            setWantedTime(prevTime => {
                if(prevTime === 0) {
                    setStarted(false)
                    setTimeFinished(!timeFinished);
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    console.log('time finished : ', timeFinished);
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
                    startCountDown();
                    startBreak()
                }, 1000);   
                
        return () => {
            clearInterval(timer);
        };
    }, [started]);

    


    return(
        <div id='app-container'>
            <Timer wantedBreakTime={wantedBreakTime} wantedTime={wantedTime} totalSesh={totalSesh} />
            <Buttons 
                started={started} 
                setStarted={setStarted} 
                timeFinished={timeFinished} 
                setTimeFinished={setTimeFinished} 
                ref={FinishedAudio}
                resetEverything={resetEverything}
            />
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