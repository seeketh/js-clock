
function SettingsCount({count, btnType}) {

    return (
        <div className="settings-count">
            <span className="settings-count-text" id={btnType === "btns" ? "session-length" : "break-length"}>
                {count}
            </span>
        </div>
    );
}

export { SettingsCount };