import './Parameters.css';
import Break from '../Break/Break';
import Session from '../Session/Session';

function Parameters({wantedTime, started, incrementSesh, decrementSesh, seconds, minutes}) {
    return(
        <div id='parameters' >
            <Break />
            <Session started={started} wantedTime={wantedTime} incrementSesh={incrementSesh} decrementSesh={decrementSesh} />
        </div>
    )
}

export default Parameters