import { IoCaretDown } from 'react-icons/io5';


function SettingsDecrButton({decrFunction, lowerBound, isActive, addChangesFn}) {
    
    const handleClick = () => {
        if (! isActive) {
            decrFunction(currentCount => {

                if (currentCount > lowerBound.current) {
                    addChangesFn(changesCount => changesCount + 1);
                    return currentCount - 1;
                } else {
                    return currentCount;
                }
            });
            
         };
    }

    return (
        <div className="decrement-btn" onClick={handleClick}>
            <IoCaretDown className="decrement-icon" />
        </div>
    );
}

export { SettingsDecrButton };