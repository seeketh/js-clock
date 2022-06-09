// The Title of the settings.

function SettingsTitle({label, btnType}) {
    return (
        <div className="settings-title-box">
            <span className="settings-title-text"  id={btnType === "btns" ? "session-label" : "break-label"}>
             { label }
            </span>
        </div>
    );
}

export { SettingsTitle };