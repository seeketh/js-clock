import { useState, useRef, useEffect } from 'react';
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
    const [shouldPlay, setShouldPlay] = useState(false);
    //const [audioPlayer, setAudioPlayer] = useState(null);
    const [activeSession, setActiveSession] = useState("Session");

    const sessionLabel = useRef("Session Length");
    const breakLabel = useRef("Break Length");
    const upperLimit = useRef(60); // Upper bound value in minutes for Session & Break length. 
    const lowerBound = useRef(1); // Lower bound value in minutes for Session & Break length.
    const audioPlayer = useRef(null); // Audio element ref, should come from the Beep component.

    useEffect(() => {
        console.log("we got a call shouldplay", shouldPlay, audioPlayer);
        //if (audioPlayer.current != null & shouldPlay) console.log("we should go in");
        console.log("called and the activeSession", activeSession);

        if (audioPlayer.current != null) {

            if(isReset) {
                setShouldPlay(false);
                audioPlayer.current.currentTime = 0;
                console.log("current time:", audioPlayer.current.currentTime);
            } else if(shouldPlay) {
                console.log("current time:", audioPlayer.current.currentTime);
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
                    <Display
                        isActive={isActive}
                        sessionTime={sessionLength * 60}
                        breakTime={breakLength * 60}
                        isReset={isReset}
                        sessionChanges={sessionChangesOnPause}
                        breakChanges={breakChangesOnPause}
                        onSetShouldPlay={setShouldPlay}
                        onSetActiveSession={setActiveSession}
                    />
                </div>
                <div className="control-box">
                    <PlayButton
                        isActive={isActive}
                        setIsActive={setIsActive}
                        setIsReset={setIsReset}
                        addSessionChanges={setSessionChangesOnPause}
                        addBreakChanges={setBreakChangesOnPause}
                    />
                    <ResetButton
                        onSetIsActive={setIsActive}
                        onSetSessionLength={setSessionLength}
                        onSetBreakLength={setBreakLength}
                        onSetIsReset={setIsReset}
                        onSetActiveSession={setActiveSession}
                    />
                </div>
                {/*<Beep elRef={audioRef => setAudioPlayer(audioRef)} />*/}
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