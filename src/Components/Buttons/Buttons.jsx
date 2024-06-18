import './Buttons.css';
import StartStop from '../StartStop/StartStop';
import Reset from '../Reset/Reset';

function Buttons() {
    return(
        <div id='buttons'>
            <StartStop />
            <Reset />
        </div>
    )
}


export default Buttons