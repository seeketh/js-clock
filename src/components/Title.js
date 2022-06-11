// Title indicating whether or not a sesson is active.
import { FaRegDotCircle } from 'react-icons/fa';

function Title({isActive, activeSession}) {
    
    //let squirrel = activeSession;
    //console.log("called with the squirrel", squirrel);
    //console.log("called with the isActive", isActive);
    return (
        <div className="session-title">
            <FaRegDotCircle className={isActive ? "session-icon-active" : "session-icon-inactive"}/>
            <span className={isActive ? "session-text-active" : "session-text-inactive"} id={"timer-label"}>
                {activeSession}
            </span>
        </div>
    );
}

export { Title };