import './Session.css';

function Session() {
    return (
        <div className='param-div' id='session-div'>
            <h1 className='param-label' id='session-label'>Session Length</h1>

            <div className='param-control' id='session-control'>
            <button id="session-increment">
                <i class="fa-solid fa-arrow-up"></i>
            </button>
            <span className='param-length' id='session-length'>25</span>
            <button id="session-decrement">
                <i class="fa-solid fa-arrow-down"></i>
            </button>
            </div>
        </div>
    )
}

export default Session