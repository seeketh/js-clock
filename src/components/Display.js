// The Clock Count display.
import { useState, useLayoutEffect, useRef } from "react";


function Display({ isActive, sessionTime, isReset, breakTime, sessionChanges, breakChanges, onSetShouldPlay, onSetActiveSession}) {

    const [secs, setSecs] = useState(0);
    const [clock, setClock] = useState("25:00");
    const [isSessionStart, setIsSessionStart] = useState(true); // At the start of the session.
    const [isBreakStart, setIsBreakStart] = useState(false); // Not at the start of the break.
    const [inSession, setInSession] = useState(true); // True - Session is active,  False -break is active.

    const sessionText = useRef("Session");
    const breakText = useRef("Break");
    const timeoutHandle = useRef(null);

    useLayoutEffect(() => {

        // Clear any setTimeOut when clock is not running

        console.log("the timeout HANDLE", timeoutHandle.current);
        if ( (timeoutHandle !== null) & !isActive ) { clearTimeout(timeoutHandle.current) }

        console.log('we got called: isSessionStart', isSessionStart);
        if (isReset) { // Use Reset to isolate Pause event and respond to reset.
            let resetMins = sessionTime / 60;
            setClock((resetMins >= 10 ? resetMins + ":00" : "0" + resetMins + ":00"));
            setSecs(0);

            setIsSessionStart(true);

            setIsBreakStart(false);
            setInSession(false);


            //onSetActiveSession("");


        } else if (isActive & isSessionStart & !isBreakStart) {
            // We are starting the session, wait for 1sec and update time.
            console.log('session started');
            onSetActiveSession(sessionText.current);
            
            timeoutHandle.current = setTimeout(() => {

                let seconds = sessionTime - 1; 

                // Session is in the first second, counting down, seconds shouldnt be zero.
                if ( (seconds > 0) ) { 
                    let equivalentMins = Math.trunc(seconds / 60);
                    let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    let equivalentSecs = seconds % 60;
                    let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    setClock(countMins + ":" + countSecs);
                    
                }

                setIsSessionStart(false); // Session has started.
                setInSession(true); // Working on the rest of the session.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
                onSetShouldPlay(false);

            }, 1000);

        } else if (isActive & isBreakStart & !isSessionStart) {
            // We are starting the Break, wait for 1sec and update time.
            onSetActiveSession(breakText.current);

            timeoutHandle.current = setTimeout(() => {

                let seconds = breakTime - 1;


                if ( (seconds > 0) ) { 
                    let equivalentMins = Math.trunc(seconds / 60);
                    let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    let equivalentSecs = seconds % 60;
                    let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    setClock(countMins + ":" + countSecs);
                    
                }

                setIsBreakStart(false); // Session has started.
                setInSession(false); // Working on the rest of break.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
                onSetShouldPlay(false);


            }, 1000);
        } else if (isActive & !isSessionStart & !isBreakStart) {
            // Either Session or Break is on going.
            inSession ?  onSetActiveSession(sessionText.current) :  onSetActiveSession(breakText.current);
            
            timeoutHandle.current = setTimeout(() => {
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

                    // Play Beep
                    onSetShouldPlay(true);

                } else if ( (seconds === 0) & !inSession ) {
                    setIsSessionStart(true); // Break is over start session.
                    setClock("00:00");

                    // Play Beep
                    onSetShouldPlay(true);

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
    }, [secs, isActive, isReset, breakTime, sessionTime, sessionChanges, breakChanges, isBreakStart, isSessionStart, inSession, onSetShouldPlay, onSetActiveSession, timeoutHandle])


    return (
        <div className="count-text">
           <span className="inner-count-text" id={"time-left"}>
                { clock }
            </span> 
        </div>
    );

}

export { Display };