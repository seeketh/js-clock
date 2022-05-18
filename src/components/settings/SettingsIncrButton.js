import { IoCaretUp } from 'react-icons/io5';


function SettingsIncrButton({incrFunction, isActive, addChangesFn}) {
    
    const handleClick = () => {
       if (! isActive) {
           incrFunction(currentCount => currentCount + 1);
           addChangesFn(currentCount => currentCount + 1);
        };
    }

    return (
        <div className="increment-btn" onClick={handleClick}>
            <IoCaretUp className="increment-icon" />
        </div>
    );
}

export { SettingsIncrButton };