import './Session.css';
import { useState, useEffect } from 'react';

function Session({wantedTime, started, incrementSesh, decrementSesh}) {
    

    return (
        <div className='param-div' id='session-div'>
            <h1 className='param-label' id='session-label'>Session Length</h1>

            <div className='param-control' id='session-control'>
            <button id="session-increment" onClick={incrementSesh}>
                <i className="fa-solid fa-arrow-up"></i>
            </button>
            <span className='param-length' id='session-length'>25</span>
            <button id="session-decrement" onClick={decrementSesh}>
                <i className="fa-solid fa-arrow-down"></i>
            </button>
            </div>
        </div>
    )
}

export default Session