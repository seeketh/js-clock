import { useState, useRef } from 'react';
import '../css/Clock.scss';
import { Title } from './Title';
import { Display } from './Display';
import { PlayButton, ResetButton } from './control';
import { SettingsButton } from './settings/SettingsButton';

// The Clock container
function Clock() {

    // Clock States
    const [isActive, setIsActive] = useState(false); // is counting?
    const [isReset, setIsReset] = useState(true); // we have a reset?
    const [sessionLength, setSessionLength] = useState(25); // 25 minutes.
    const [breakLength, setBreakLength] = useState(5); // 5 minutes.
    const [sessionChangesOnPause, setSessionChangesOnPause] = useState(0); // Number of changes on session lenghth during current pause.
    const [breakChangesOnPause, setBreakChangesOnPause] = useState(0); // Number of changes on sbreak lenghth during current pause.

    const sessionLabel = useRef("Session Length");
    const breakLabel = useRef("Break Length");
    const lowerBound = useRef(1); // Lower bound value in minutes for Session & Break length 

    return (
        <div className="clock-box">
            <div className="display-box">
                <div className="title-box">
                    <Title isActive={isActive} />
                </div>
                <div className="count-box">
                    <Display
                        isActive={isActive}
                        sessionTime={sessionLength * 60}
                        breakTime={breakLength * 60}
                        isReset={isReset}
                        sessionChanges={sessionChangesOnPause}
                        breakChanges={breakChangesOnPause}
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
                        setIsActive={setIsActive}
                        setSessionLength={setSessionLength}
                        setBreakLength={setBreakLength}
                        setIsReset={setIsReset}
                    />
                </div>
            </div>
            <div className="settings-box">
                <div className="spacer"></div>
                <div className="session-box">
                    <SettingsButton 
                        settingsLabel={sessionLabel.current} 
                        lowerLimit={lowerBound} 
                        setFn={setSessionLength} 
                        settingsLength={sessionLength} 
                        isActive={isActive} 
                        addChangesFn={setSessionChangesOnPause} 
                    />
                </div>
                <div className="break-box">
                    <SettingsButton 
                    settingsLabel={breakLabel.current} 
                    lowerLimit={lowerBound} 
                    setFn={setBreakLength} 
                    settingsLength={breakLength} 
                    isActive={isActive} 
                    addChangesFn={setBreakChangesOnPause} 
                />
                </div>
                <div className="spacer"></div>
            </div>

        </div>
    );
}

export { Clock };