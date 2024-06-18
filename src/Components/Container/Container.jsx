import './Container.css';
import Parameters from '../Parameters/Parameters';
import Timer from '../Timer/Timer';

function Container() {
    return(
        <div id='app-container'>
            <Parameters />
            <Timer />
        </div>
    )
}


export default Container