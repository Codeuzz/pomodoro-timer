import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect, useRef } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);
    const [timeFinished, setTimeFinished] = useState(false);
    const [timeFinishedB, setTimeFinishedB] = useState(false);
    const [seshTime, setSeshTime] = useState(1500);
    const [wantedBreakTime, setWantedBreakTime] = useState(300);
    const [breakTime, setBreakTime] = useState(300);
    const [onBreak, setOnBreak] = useState(false);

    const FinishedAudio = useRef(null);
    const [totalSesh, setTotalSesh] = useState(1)
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

        if (timerIdRef.current) {

            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }

    }

    const resetBtn = () => {
        setWantedTime(1500);
        setSeshTime(1500);
        setWantedBreakTime(300);
        setBreakTime(300)
        setStarted(false);
        setTimeFinished(false);
        setTimeFinishedB(false);
        setOnBreak(false);
        setTotalSesh(1);
        FinishedAudio.current.pause();
        FinishedAudio.current.currentTime = 0;

        if (timerIdRef.current) {

            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
    }

    const startBreak = () => {
        if(onBreak && started) {
            setWantedBreakTime(prevTime => {
                if(prevTime <= 0) {
                    setStarted(false)
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    setTimeFinishedB(true);
                    console.log("this is supposed to be 0 : ", prevTime)

                    setWantedTime(1500)
                    setTimeFinished(false);
                    setOnBreak(false);
                    if (timerIdRef.current) {

                        clearInterval(timerIdRef.current);
                        timerIdRef.current = null;
                    }

                    return 0;
                } else {
                    console.log("countdown : ", prevTime - 1)
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
                    setWantedBreakTime(300)
                    setOnBreak(true);

                    return 0
                } else {
                   return prevTime - 1;
                }
            });
        } 
    }

    useEffect(() => {

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
            <Timer onBreak={onBreak} wantedBreakTime={wantedBreakTime} wantedTime={wantedTime} totalSesh={totalSesh} />
            <Buttons 
                started={started} 
                setStarted={setStarted} 
                timeFinished={timeFinished} 
                setTimeFinished={setTimeFinished} 
                ref={FinishedAudio}
                resetBtn={resetBtn}
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