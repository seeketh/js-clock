// The Clock Count display.
import { useState, useLayoutEffect } from "react";


function Display({ isActive, sessionTime, isReset, breakTime, sessionChanges, breakChanges}) {

    const [secs, setSecs] = useState(0);
    const [clock, setClock] = useState("25:00");
    const [isSessionStart, setIsSessionStart] = useState(true); // At the start of the session.
    const [isBreakStart, setIsBreakStart] = useState(false); // Not at the start of the break.
    const [inSession, setInSession] = useState(null); // True - Session is active,  False -break is active.

    // Given seconds, return clock count, and flag shift between Session and Break.
    /*function secsToClock(seconds) {

        if ( (seconds > 0) & isActive ) { 
            let equivalentMins = Math.trunc(seconds / 60);
            let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
            let equivalentSecs = seconds % 60;
            let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
            setClock(countMins + ":" + countSecs);
            //setSecs(seconds);
           // return countMins + ":" + countSecs;
            
        } else if ( (seconds === 0) & isActive & inSession ) {
            setIsBreakStart(true); // Session is over start break.
            setClock("00:00");
            //return "00:00";
        } else if ( (seconds === 0) & isActive & !inSession ) {
            setIsSessionStart(true); // Break is over start session.
            setClock("00:00");
            //return "00:00";
        }
        // Else do nothing.
    }*/

    useLayoutEffect(() => {
        console.log('we got called: isSessionStart', isSessionStart);
        if (isReset) { // Use Reset to isolate Pause event and respond to reset.
            let resetMins = sessionTime / 60;
            setClock((resetMins >= 10 ? resetMins + ":00" : "0" + resetMins + ":00"));
            setSecs(0);
            setIsSessionStart(true);
            setIsBreakStart(false);
            setInSession(false);

        } else if (isActive & isSessionStart & !isBreakStart) {
            // Session has just started, wait for 1sec and update time.
            console.log('we are in');
            setTimeout(() => {
                //secsToClock(Number.parseInt(sessionTime) - 1);

                let seconds = Number.parseInt(sessionTime);
                console.log('we are in');

                if ( (seconds > 0) ) { 
                    let equivalentMins = Math.trunc(seconds / 60);
                    let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    let equivalentSecs = seconds % 60;
                    let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    setClock(countMins + ":" + countSecs);
                    
                }


                //setClock(secsToClock(sessionTime - 1)); // -1 as we would've already waited for 1 second.
                setIsSessionStart(false); // Session has started.
                setInSession(true); // Working on the rest of the session.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
            }, 1000);

        } else if (isActive & isBreakStart & !isSessionStart) {
            // Break has just started, wait for 1sec and update time.
            setTimeout(() => {
                //secsToClock(Number.parseInt(breakTime) - 1);

                let seconds = Number.parseInt(breakTime);


                if ( (seconds > 0) ) { 
                    let equivalentMins = Math.trunc(seconds / 60);
                    let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    let equivalentSecs = seconds % 60;
                    let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    setClock(countMins + ":" + countSecs);
                    
                }


                //setClock(secsToClock(breakTime - 1)); // -1 as we would've already waited for 1 second.
                setIsBreakStart(false); // Session has started.
                setInSession(false); // Working on the rest of break.
                setSecs(seconds); // -1 as we would've already waited for 1 second.

            }, 1000);
        } else if (isActive & !isSessionStart & !isBreakStart) {
            setTimeout(() => {
                //secsToClock(secs - 1);


                let seconds = secs - 1;


                if ( (seconds > 0) ) { 
                    let equivalentMins = Math.trunc(seconds / 60);
                    let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    let equivalentSecs = seconds % 60;
                    let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    setClock(countMins + ":" + countSecs);
                    
                } else if ( (seconds === 0) & inSession ) {
                    setIsBreakStart(true); // Session is over start break.
                    setClock("00:00");
                    //return "00:00";
                } else if ( (seconds === 0) & !inSession ) {
                    setIsSessionStart(true); // Break is over start session.
                    setClock("00:00");
                    //return "00:00";
                }
                // Else do nothing.

                //setClock(secsToClock(secs - 1)); // -1 as we would've already waited for 1 second.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
            }, 1000);       
        } else {// Paused and modification on session or break lenght.
            console.log('hi', secs);
            console.log('changes', sessionChanges, breakChanges);

            if (inSession & (sessionChanges > 0)) {
                // Adjust clock  display and Allow new Session count down to start.
                let equivalentMins = sessionTime / 60;
                let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                setClock(countMins + ":00");
                setIsSessionStart(true);

            } else if(!inSession & (breakChanges > 0)) {
                // Adjust clock  display and Allow new break count down to start.
                let equivalentMins = breakTime / 60;
                let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                setClock(countMins + ":00");
                setIsBreakStart(true);
            }

        }
    }, [secs, isActive, isReset, breakTime, sessionTime, sessionChanges, breakChanges, isBreakStart, isSessionStart, inSession])


    return (
        <div className="count-text">
           <span className="inner-count-text">{ clock }</span> 
        </div>
    );

}

export { Display };