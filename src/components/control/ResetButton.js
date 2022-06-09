import { RiRestartLine } from 'react-icons/ri';

// Resets Session and Break Lengths, and
// clock's Active state to their default values.
function ResetButton({onSetIsActive, onSetSessionLength, onSetBreakLength, onSetIsReset, onSetActiveSession}) {

    function handleReset() {
        let defaultSessionLength = 25;
        let defaultBreakLength = 5;
        let defaultActiveState = false;
        let defaultActiveSession = "Session";

        // Reset.
        onSetIsActive(defaultActiveState);
        onSetSessionLength(defaultSessionLength);
        onSetBreakLength(defaultBreakLength);
        onSetIsReset(true); // Reset was clicked.
        onSetActiveSession(defaultActiveSession);
    }

    return (
        <div className="reset-box" onClick={handleReset} id={"reset"}>
            <RiRestartLine className="reset-btn"/>
        </div>
    );
}

export { ResetButton };