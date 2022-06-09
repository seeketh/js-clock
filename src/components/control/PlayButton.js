
import { IoPlay, IoPause } from 'react-icons/io5';


function PlayButton({isActive, setIsActive, setIsReset, addSessionChanges, addBreakChanges}) {

    function handlePlayPause() {
        setIsActive(currentState => !currentState);
        
        setIsReset(false); // It was not a reset if play/pause was clicked.
        console.log('reset is false')
        addSessionChanges(0); // Reset the count of changed made before this play/pause.
        addBreakChanges(0); // Reset the count of changed made before this play/pause.

    }

    return (
        <div onClick={handlePlayPause} id={"start_stop"}>
            {isActive ? <IoPause className="play-btn"/> : <IoPlay className="play-btn"/>}
        </div>
    );
}

export { PlayButton };