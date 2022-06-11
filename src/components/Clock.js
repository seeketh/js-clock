import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import '../css/Clock.scss';
import { Title } from './Title';
import { Display } from './Display';
import { PlayButton, ResetButton } from './control';
import { SettingsButton } from './settings/SettingsButton';
import { Beep } from './Beep';

// The Clock container
function Clock() {

    // Clock States
    const [isActive, setIsActive] = useState(false); // is counting?
    const [isReset, setIsReset] = useState(false); // we have a reset?
    const [sessionLength, setSessionLength] = useState(25); // 25 minutes.
    const [breakLength, setBreakLength] = useState(5); // 5 minutes.
    const [sessionChangesOnPause, setSessionChangesOnPause] = useState(0); // Number of changes on session lenghth during current pause.
    const [breakChangesOnPause, setBreakChangesOnPause] = useState(0); // Number of changes on sbreak lenghth during current pause.
    const [shouldPlay, setShouldPlay] = useState(false); // Should the Beeo sound play?
    const [activeSession, setActiveSession] = useState("Session"); // Current count down belongs to this.

    const [secs, setSecs] = useState(0);
    const [clock, setClock] = useState("25:00");
    const [isSessionStart, setIsSessionStart] = useState(true); // Whether or not the Clock is At the start of the session.
    const [isBreakStart, setIsBreakStart] = useState(false); // Whether or not the Clock is at the start of the break.
    const [inSession, setInSession] = useState(true); // True - Session is active,  False -break is active.


    const sessionLabel = useRef("Session Length");
    const breakLabel = useRef("Break Length");
    const upperLimit = useRef(60); // Upper bound value in minutes for Session & Break length. 
    const lowerBound = useRef(1); // Lower bound value in minutes for Session & Break length.



    const audioPlayer = useRef(null); // Audio element ref, should come from the Beep component.

    //const sessionText = useRef("Session");
    //const breakText = useRef("Break");
    const timeoutHandle = useRef(null);

    useLayoutEffect(() => {

        const defaultSessionLength = 25;
        const defaultBreakLength = 5;
        const defaultTimeLeft = 0;
        const defaultActiveState = false;
        const defaultClockTime = "25:00";
        const sessionText = "Session";
        const breakText = "Break";


        // Converts seconds to MM:SS clock
        const secsToClock = (seconds) => {
            let equivalentMins = Math.floor(seconds / 60);
            let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
            let equivalentSecs = seconds - equivalentMins * 60;
            let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;

            return countMins + ":" + countSecs;
        }

        // Clear any setTimeOut when clock is not running
        //console.log("the timeout HANDLE", timeoutHandle.current);
        if ( (timeoutHandle !== null) & !isActive ) { clearTimeout(timeoutHandle.current) }

        if (isReset) { // Use Reset to isolate Pause event and respond to reset.
            
            // Start Resetting.
            setActiveSession(sessionText);
            setIsActive(defaultActiveState);
            setSessionLength(defaultSessionLength);
            setBreakLength(defaultBreakLength);

            setClock((defaultClockTime));
            setSecs(defaultTimeLeft);

            setIsSessionStart(true); // We want to start with a session.
            setIsBreakStart(false);
            setInSession(false);

            setSessionChangesOnPause(0);
            setBreakChangesOnPause(0);
          
            setIsReset(false); // Reset completed.

        } else if (isActive & isSessionStart & !isBreakStart) {
            // We are starting the session, wait for 1sec and update time.
            console.log('session started');
            setActiveSession(sessionText);
            
            timeoutHandle.current = setTimeout(() => {
                // Time left: A seconnd would have passed when is code gets executed.
                let seconds = sessionLength * 60 - 1; 

                // let equivalentMins = Math.floor(seconds / 60);
                // let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                // let equivalentSecs = seconds - equivalentMins * 60;
                // let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;

                // setClock(countMins + ":" + countSecs);

                setClock(secsToClock(seconds));
                setIsSessionStart(false); // Session has started.
                setInSession(true); // Working on the rest of the session.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
                setShouldPlay(false); // Shouldn't play the beep.

            }, 1000);

        } else if (isActive & isBreakStart & !isSessionStart) {
            // We are starting the Break, wait for 1sec and update time.
            console.log('break started');
            setActiveSession(breakText);

            timeoutHandle.current = setTimeout(() => {

                // Time left: A seconnd would have passed when is code gets executed.
                let seconds = breakLength * 60 - 1;

                // let equivalentMins = Math.floor(seconds / 60);
                // let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                // let equivalentSecs = seconds - equivalentMins * 60;
                // let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;

                // setClock(countMins + ":" + countSecs);

                setClock(secsToClock(seconds));

                setIsBreakStart(false); // Session has started.
                setInSession(false); // Working on the rest of break.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
                setShouldPlay(false);


            }, 1000);
        } else if (isActive & !isSessionStart & !isBreakStart) {
            // Either Session or Break is on going.
            inSession ?  setActiveSession(sessionText) :  setActiveSession(breakText);
            
            timeoutHandle.current = setTimeout(() => {
                //secsToClock(secs - 1);

                let seconds = secs - 1;

                if ( (seconds >= 0) ) { 
                    // let equivalentMins = Math.trunc(seconds / 60);
                    // let countMins = (equivalentMins < 10) ? "0" + equivalentMins : equivalentMins;
                    // let equivalentSecs = seconds % 60;
                    // let countSecs = (equivalentSecs < 10) ? "0" + equivalentSecs : equivalentSecs;
                    // setClock(countMins + ":" + countSecs);

                    setClock(secsToClock(seconds));
                    
                } else if ( (seconds === -1) & inSession ) {
                    setIsBreakStart(true); // Session is over start break.
                    setClock((breakLength < 10) ? "0" + breakLength + ":00" : breakLength + ":00");

                    // Play Beep
                    setShouldPlay(true);

                } else if ( (seconds === -1) & !inSession ) {
                    setIsSessionStart(true); // Break is over start session.
                    setClock((sessionLength < 10) ? "0" + sessionLength + ":00" : sessionLength + ":00");

                    // Play Beep
                    setShouldPlay(true);

                }

                //setClock(secsToClock(secs - 1)); // -1 as we would've already waited for 1 second.
                setSecs(seconds); // -1 as we would've already waited for 1 second.
            }, 1000);       
        } else {// Paused and modification on session or break length.
            //console.log('hi', secs);
            console.log('changes', inSession, isSessionStart, sessionChangesOnPause, breakChangesOnPause);

            if ((inSession | isSessionStart) & (sessionChangesOnPause > 0)) {//& (sessionChangesOnPause > 0)) {
                // Adjust clock  display and Allow new Session count down to start.
                //let equivalentMins = sessionLength / 60;
                let countMins = (sessionLength < 10) ? "0" + sessionLength : sessionLength;
                setClock(countMins + ":00");
                setIsSessionStart(true);
                console.log("changing pauased clock with new SL");

            } else if((!inSession | isBreakStart) & (breakChangesOnPause > 0)) {//& (breakChangesOnPause > 0)) {
                // Adjust clock  display and Allow new break count down to start.
                //let equivalentMins = breakLength / 60;
                let countMins = (breakLength < 10) ? "0" + breakLength : breakLength;
                setClock(countMins + ":00");
                setIsBreakStart(true);
                console.log("changing pauased clock with new BL");
            }

        }
    }, [secs, isActive, isReset, breakLength, sessionLength, sessionChangesOnPause, breakChangesOnPause, isBreakStart, isSessionStart, inSession, setShouldPlay, setActiveSession, timeoutHandle, setIsReset])



    useEffect(() => {
        //console.log("we got a call shouldplay", shouldPlay, audioPlayer);
        //if (audioPlayer.current != null & shouldPlay) console.log("we should go in");
        //console.log("called and the activeSession", activeSession);

        if (audioPlayer.current != null) {

            if(isReset) {
                setShouldPlay(false);
                audioPlayer.current.pause()
                audioPlayer.current.currentTime = 0;
                //console.log("current time:", audioPlayer.current.currentTime);
            } else if(shouldPlay) {
                //console.log("current time:", audioPlayer.current.currentTime);
                audioPlayer.current.play();
            }


        }
    }, [shouldPlay, audioPlayer, isReset, activeSession])

    return (
        <div className="clock-box">
            <div className="display-box">
                <div className="title-box">
                    <Title isActive={isActive} activeSession={activeSession} />
                </div>
                <div className="count-box">

                    <Display clock={clock} />
                </div>
                <div className="control-box">
                    <PlayButton
                        isActive={isActive}
                        setIsActive={setIsActive}
                        setIsReset={setIsReset}
                        isReset={isReset}
                        addSessionChanges={setSessionChangesOnPause}
                        addBreakChanges={setBreakChangesOnPause}
                    />
                    <ResetButton
                        onSetIsActive={setIsActive}
                        onSetSessionLength={setSessionLength}
                        onSetBreakLength={setBreakLength}
                        onSetIsReset={setIsReset}
                        onSetActiveSession={setActiveSession}
                        isReset={isReset}
                    />
                </div>
                <Beep elRef={audioPlayer} />

            </div>
            <div className="settings-box">
                <div className="spacer"></div>
                <div className="session-box">
                    <SettingsButton 
                        settingsLabel={sessionLabel.current} 
                        lowerLimit={lowerBound}
                        upperLimit={upperLimit}
                        setFn={setSessionLength} 
                        settingsLength={sessionLength} 
                        isActive={isActive} 
                        addChangesFn={setSessionChangesOnPause}
                        btnType={"btns"}
                    />
                </div>
                <div className="break-box">
                    <SettingsButton 
                    settingsLabel={breakLabel.current} 
                    lowerLimit={lowerBound}
                    upperLimit={upperLimit}
                    setFn={setBreakLength} 
                    settingsLength={breakLength} 
                    isActive={isActive} 
                    addChangesFn={setBreakChangesOnPause}
                    btnType={"btnb"}
                />
                </div>
                <div className="spacer"></div>
            </div>

        </div>
    );
}

export { Clock };