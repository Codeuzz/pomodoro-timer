import './Reset.css';

function Reset({resetEverything}) {
    return(
           <button id='reset' onClick={resetEverything}>
             <i className="fa-solid fa-arrows-rotate"></i>
           </button>
    )
}


export default Reset