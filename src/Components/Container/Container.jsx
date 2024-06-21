import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);
    const [timeFinished, setTimeFinished] = useState(false)

    const incrementSesh = () => {
        setWantedTime(prevTime => prevTime + 60);
        console.log(wantedTime);
    }

    const decrementSesh = () => {
        setWantedTime(prevTime => prevTime - 60);
        console.log(wantedTime);
    }

    const startCountDown = () => {
        if(started) {
            setWantedTime(prevTime => {
                if(prevTime === 0) {
                    setTimeFinished(!timeFinished);
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
            <Timer wantedTime={wantedTime} />
            <Buttons started={started} setStarted={setStarted} timeFinished={timeFinished} />
            <Parameters wantedTime={wantedTime}  incrementSesh={incrementSesh} decrementSesh={decrementSesh}/>

        </div>
    )
}


export default Container