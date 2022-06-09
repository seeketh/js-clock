import { IoCaretDown } from 'react-icons/io5';


function SettingsDecrButton({decrFunction, lowerBound, isActive, addChangesFn, btnType}) {
    
    const handleClick = () => {
        if (! isActive) {
            decrFunction(currentCount => {

                if (currentCount > lowerBound.current) {
                    addChangesFn(changesCount => changesCount + 1);
                    return currentCount - 1;
                } else {
                    return lowerBound.current;
                }
            });
            
         };
    }

    return (
        <div className="decrement-btn" onClick={handleClick}  id={btnType === "btns" ? "session-decrement" : "break-decrement"}>
            <IoCaretDown className="decrement-icon" />
        </div>
    );
}

export { SettingsDecrButton };