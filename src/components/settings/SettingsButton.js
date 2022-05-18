import { SettingsTitle} from "./SettingTitle";
import {  SettingsIncrButton } from "./SettingsIncrButton";
import { SettingsDecrButton } from "./SettingsDecrButton";
import { SettingsCount } from "./SettingsCount";

function SettingsButton({settingsLabel, lowerLimit, setFn, settingsLength, isActive, addChangesFn}) {
    return (
        <div className="settings-btn">
            <div className="btn-title">
                <SettingsTitle label={settingsLabel} />
            </div>
            <SettingsCount  count={settingsLength}/>
            <div className="btn-controls">
                <SettingsIncrButton incrFunction={setFn} isActive={isActive} addChangesFn={addChangesFn} />
                <SettingsDecrButton decrFunction={setFn} lowerBound={lowerLimit} isActive={isActive} addChangesFn={addChangesFn} />
            </div>
        </div>
    );
}

export { SettingsButton };