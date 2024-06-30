import './Reset.css';

function Reset({resetBtn, setTotalSesh}) {
    return(
           <button id='reset' onClick={resetBtn}>
             <i className="fa-solid fa-arrows-rotate"></i>
           </button>
    )
}


export default Reset