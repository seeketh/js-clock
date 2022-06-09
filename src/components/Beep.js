
// const beep = require("../audio/beep.wav");
import beep from "../audio/beep.wav";

function Beep({elRef}) {


    return (
        <div>
            <audio ref={elRef} src={beep} id={"beep"}>

            </audio>
        </div>
    )
}

export { Beep };