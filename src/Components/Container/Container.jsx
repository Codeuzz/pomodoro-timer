import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect, useRef } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);
    const [timeFinished, setTimeFinished] = useState(false);
    const [timeFinishedB, setTimeFinishedB] = useState(true);
    const [seshTime, setSeshTime] = useState(1500);
    const [wantedBreakTime, setWantedBreakTime] = useState(300);
    const [breakTime, setBreakTime] = useState(300);
    const [onBreak, setOnBreak] = useState(false);

    const FinishedAudio = useRef(null);
    const [totalSesh, setTotalSesh] = useState(0)
    const timerIdRef = useRef(null);

    const incrementSesh = () => {
        setWantedTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
        setSeshTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
    }

    const decrementSesh = () => {
        setWantedTime(prevTime => prevTime - 60 <= 0 ? 1 : prevTime - 60);
        setSeshTime(prevTime => prevTime - 60 <= 0 ? 1 : prevTime - 60);
    }

    const incrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
        setBreakTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)

    }
    const decrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime - 60 <= 0 ? 1 : prevTime - 60);
        setBreakTime(prevTime => prevTime - 60 <= 0 ? 1 : prevTime - 60);
    }
    const resetEverything = () => {
        setWantedTime(1500);
        setSeshTime(1500);
        setWantedBreakTime(300);
        setBreakTime(300)
        setStarted(false);
        setTimeFinished(false);
        setTimeFinishedB(true);
        setOnBreak(false);
        FinishedAudio.current.pause();
        FinishedAudio.current.currentTime = 0;

        if (timerIdRef.current) {
            console.log("removed timer, reset")

            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }

    }

    const startBreak = () => {
        if(onBreak && started) {
            setWantedBreakTime(prevTime => {
                if(prevTime === 0) {
                    setStarted(false)
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    setTimeFinishedB(true);

                    resetEverything()

                    return 0;
                } else {
                   return prevTime - 1
                }
            });
        }
    }

    const startCountDown = () => {
        if(started && !timeFinished && !onBreak) {
            setWantedTime(prevTime => {
                if(prevTime === 0) {
                    setStarted(false)
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    setTimeFinished(true);
                    setTimeFinishedB(false);
                    setOnBreak(true);
                    console.log('time finished : ', timeFinished);

                    return 0
                } else {
                   return prevTime - 1;
                }
            });
        } 
    }

    useEffect(() => {
        console.log("Setting interval");
        console.log("time finished useffect :",timeFinished);

        if (started) {
            if (onBreak) {
                timerIdRef.current = setInterval(() => {
                    startBreak();
                }, 1000);
            } else {
                timerIdRef.current = setInterval(() => {
                    startCountDown();
                }, 1000);
            }
        }

        return () => {
            if (timerIdRef.current) {
                console.log("removed timer, unmounted")
                clearInterval(timerIdRef.current);
            }
        };
    }, [started]);

    useEffect(() => {
        if(timeFinishedB) {
            setTotalSesh(prev => prev + 1)

        }
    }, [timeFinishedB])

    


    return(
        <div id='app-container'>
            <Timer timeFinished={timeFinished} wantedBreakTime={wantedBreakTime} wantedTime={wantedTime} totalSesh={totalSesh} />
            <Buttons 
                started={started} 
                setStarted={setStarted} 
                timeFinished={timeFinished} 
                setTimeFinished={setTimeFinished} 
                ref={FinishedAudio}
                resetEverything={resetEverything}
                setTotalSesh={setTotalSesh}
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