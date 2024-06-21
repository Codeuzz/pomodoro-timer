import './Buttons.css';
import StartStop from '../StartStop/StartStop';
import Reset from '../Reset/Reset';

function Buttons({started, setStarted, timeFinished}) {
    return(
        <div id='buttons'>
            <StartStop timeFinished={timeFinished} started={started} setStarted={setStarted} />
            <Reset />
        </div>
    )
}


export default Buttons