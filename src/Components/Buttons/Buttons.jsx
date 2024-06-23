import './Buttons.css';
import StartStop from '../StartStop/StartStop';
import Reset from '../Reset/Reset';
import { forwardRef } from 'react';

const Buttons = forwardRef(({started, setStarted, timeFinished, setTimeFinished, resetEverything}, ref) => {
    return(
        <div id='buttons'>
            <StartStop ref={ref} timeFinished={timeFinished} setTimeFinished={setTimeFinished} started={started} setStarted={setStarted} />
            <Reset resetEverything={resetEverything} />
        </div>
    )
})


export default Buttons