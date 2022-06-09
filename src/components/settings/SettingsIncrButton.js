import { IoCaretUp } from 'react-icons/io5';


function SettingsIncrButton({incrFunction, upperBound, isActive, addChangesFn, btnType}) {
    
    const handleClick = () => {
       
    if (! isActive) {
        incrFunction(currentCount => {

            if (currentCount < upperBound.current) {
                addChangesFn(changesCount => changesCount + 1);
                return currentCount + 1;
            } else {
                return upperBound.current; 
            }
        });
        
    };

}

    return (
        <div className="increment-btn" onClick={handleClick} id={btnType === "btns" ? "session-increment" : "break-increment"}>
            <IoCaretUp className="increment-icon" />
        </div>
    );
}

export { SettingsIncrButton };