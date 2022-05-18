// The Title of the settings.

function SettingsTitle({label}) {
    return (
        <div className="settings-title-box">
            <span className="settings-title-text">
             { label }
            </span>
        </div>
    );
}

export { SettingsTitle };