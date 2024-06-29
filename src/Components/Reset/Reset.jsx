import './Reset.css';

function Reset({resetEverything, setTotalSesh}) {
    return(
           <button id='reset' onClick={() => {resetEverything();
            setTotalSesh(0)
           } }>
             <i className="fa-solid fa-arrows-rotate"></i>
           </button>
    )
}


export default Reset