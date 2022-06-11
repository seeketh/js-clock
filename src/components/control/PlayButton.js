
import { IoPlay, IoPause } from 'react-icons/io5';


function PlayButton({isActive, setIsActive, isReset, addSessionChanges, addBreakChanges}) {

    function handlePlayPause() {
        setIsActive(currentState => !currentState);
        console.log('PP clicked - was reset active?: ', isReset);
        
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