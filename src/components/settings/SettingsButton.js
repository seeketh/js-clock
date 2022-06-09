import { SettingsTitle} from "./SettingTitle";
import {  SettingsIncrButton } from "./SettingsIncrButton";
import { SettingsDecrButton } from "./SettingsDecrButton";
import { SettingsCount } from "./SettingsCount";

function SettingsButton({settingsLabel, upperLimit, lowerLimit, setFn, settingsLength, isActive, addChangesFn, btnType}) {
    return (
        <div className="settings-btn">
            <div className="btn-title">
                <SettingsTitle
                    label={settingsLabel}
                    btnType={btnType}
                />
            </div>
            <SettingsCount
                count={settingsLength}
                btnType={btnType}
            />
            <div className="btn-controls">
                <SettingsIncrButton
                    incrFunction={setFn} 
                    upperBound={upperLimit}
                    isActive={isActive}
                    addChangesFn={addChangesFn}
                    btnType={btnType}
                />
                <SettingsDecrButton
                    decrFunction={setFn}
                    lowerBound={lowerLimit}
                    isActive={isActive}
                    addChangesFn={addChangesFn}
                    btnType={btnType}
                />
            </div>
        </div>
    );
}

export { SettingsButton };