import { RiRestartLine } from 'react-icons/ri';

// Resets Session and Break Lengths, and
// clock's Active state to their default values.
function ResetButton({setIsActive, setSessionLength, setBreakLength, setIsReset}) {

    function handleReset() {
        let defaultSessionLength = 25;
        let defaultBreakLength = 5;
        let defaultActiveState = false;

        // Reset.
        setIsActive(defaultActiveState);
        setSessionLength(defaultSessionLength);
        setBreakLength(defaultBreakLength);
        setIsReset(true); // Reset was clicked.

        //setChangesOnPause(0); // Reset the count of changed made before this reset.
    }

    return (
        <div className="reset-box" onClick={handleReset}>
            <RiRestartLine className="reset-btn"/>
        </div>
    );
}

export { ResetButton };