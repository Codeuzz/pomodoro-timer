import './Break.css';

function Break({incrementBreak, decrementBreak, breakTime}) {
    return (
        <div className='param-div' id='break-div'>
            <h1 className='param-label' id='break-label'>Break Length</h1>

            <div className='param-control' id='break-control'>
            <button id="break-increment" onClick={incrementBreak}>
                <i className="fa-solid fa-arrow-up"></i>
            </button>
            <span className='param-length' id='break-length'>{breakTime / 60}</span>
            <button id="break-decrement" onClick={decrementBreak}>
                <i className="fa-solid fa-arrow-down"></i>
            </button>
            </div>
        </div>
    )
}

export default Break