import './Parameters.css';
import Break from '../Break/Break';
import Session from '../Session/Session';

function Parameters({wantedTime, started, incrementSesh, decrementSesh, seshTime, incrementBreak, decrementBreak, breakTime}) {
    return(
        <div id='parameters' >
            <Break breakTime={breakTime} incrementBreak={incrementBreak} decrementBreak={decrementBreak} />
            <Session seshTime={seshTime} started={started} wantedTime={wantedTime} incrementSesh={incrementSesh} decrementSesh={decrementSesh} />
        </div>
    )
}

export default Parameters