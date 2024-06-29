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
    const FinishedAudio = useRef(null);
    const [totalSesh, setTotalSesh] = useState(0)

    const incrementSesh = () => {
        setWantedTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
        setSeshTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
    }

    const decrementSesh = () => {
        setWantedTime(prevTime => prevTime - 60 <= 0 ? 0 : prevTime - 60);
        setSeshTime(prevTime => prevTime - 60 <= 0 ? 0 : prevTime - 60);
    }

    const incrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)
        setBreakTime(prevTime => prevTime + 60 >= 3600 ? 3600 : prevTime + 60)

    }
    const decrementBreak = () => {
        setWantedBreakTime(prevTime => prevTime - 60 <= 0 ? 0 : prevTime - 60);
        setBreakTime(prevTime => prevTime - 60 <= 0 ? 0 : prevTime - 60);
    }
    const resetEverything = () => {
        setWantedTime(1500);
        setSeshTime(1500);
        setWantedBreakTime(300);
        setBreakTime(300)
        setStarted(false);
        setTimeFinished(false);
        FinishedAudio.currentTime = 0;
        console.log(FinishedAudio)

    }

    const startBreak = () => {
        if(!timeFinishedB && started) {
            setWantedBreakTime(prevTime => {
                if(prevTime === 0) {
                    setStarted(false)
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    resetEverything()
                    setTimeFinishedB(true);

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
                    FinishedAudio.current.currentTime = 0;
                    FinishedAudio.current.play();
                    setTimeFinished(true);
                    setTimeFinishedB(false)
                    console.log('time finished : ', timeFinished);
                } else {
                   return prevTime - 1;
                }
            });
        } 
    }

    useEffect(() => {
        console.log("Setting interval");
        console.log("time finished useffect :",timeFinished);

                const timer = setInterval(() => {
                    startCountDown();
                    startBreak()
                }, 1000);   
                
        return () => {
            clearInterval(timer);
        };
    }, [started]);

    useEffect(() => {
        if(timeFinishedB) {
            setTotalSesh(prev => prev + 1)

        }
    }, [timeFinishedB])

    


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