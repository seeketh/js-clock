// Title indicating whether or not a sesson is active.
import { FaRegDotCircle } from 'react-icons/fa';

function Title({isActive}) {
    
    return (
        <div className="session-title" id="timer-label">
            <FaRegDotCircle className={isActive ? "session-icon-active" : "session-icon-inactive"}/>
            <span className={isActive ? "session-text-active" : "session-text-inactive"}>
                session
            </span>
        </div>
    );
}

export { Title };