import './Buttons.css';
import StartStop from '../StartStop/StartStop';
import Reset from '../Reset/Reset';

function Buttons({started, setStarted}) {
    return(
        <div id='buttons'>
            <StartStop started={started} setStarted={setStarted} />
            <Reset />
        </div>
    )
}


export default Buttons