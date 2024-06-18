import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';
import Buttons from '../Buttons/Buttons';

function Container() {
    return(
        <div id='app-container'>
            <Parameters />
            <Buttons />
            <Timer />
        </div>
    )
}


export default Container