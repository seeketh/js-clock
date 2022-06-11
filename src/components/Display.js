// The Clock Count display.

function Display({clock}) {

    return (
        <div className="count-text">
           <span className="inner-count-text" id={"time-left"}>
                { clock }
            </span> 
        </div>
    );

}

export { Display };