import { RiRestartLine } from 'react-icons/ri';

// Resets Session and Break Lengths, and
// clock's Active state to their default values.
//function ResetButton({onSetIsActive, onSetSessionLength, onSetBreakLength, onSetIsReset, onSetActiveSession, isReset}) {
function ResetButton({onSetIsReset}) {

    function handleReset() {
        
        onSetIsReset(true); // Reset was clicked.
        console.log("reset pressed");
        
    }

    return (
        <div className="reset-box" onClick={handleReset} id={"reset"}>
            <RiRestartLine className="reset-btn"/>
        </div>
    );
}

export { ResetButton };