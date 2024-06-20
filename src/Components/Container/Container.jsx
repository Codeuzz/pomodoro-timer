import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';
import { useState, useEffect } from 'react';

function Container() {
    const [wantedTime, setWantedTime] = useState(1500);
    const [started, setStarted] = useState(false);

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
            setWantedTime(prevTime => prevTime - 1);
            console.log(wantedTime);
        } 
        // else if(wantedTime === 0) {
        //     console.log("ZEROOOO");
        //     setWantedTime(0);

        // }
            
    }

    useEffect(() => {
        console.log("Setting interval");
                const timer = setInterval(() => {
                    startCountDown();
                }, 1000);   

        return () => {
            console.log("Clearing interval");
            clearInterval(timer);
        };
    }, [started]);

    


    return(
        <div id='app-container'>
            <Timer wantedTime={wantedTime} />
            <Buttons started={started} setStarted={setStarted} />
            <Parameters wantedTime={wantedTime}  incrementSesh={incrementSesh} decrementSesh={decrementSesh}/>

        </div>
    )
}


export default Container