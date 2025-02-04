import EmojiPicker from "./EmojiPicker";
import {useRef} from "react";


export default function EmojiPickerInput(){

    const refInput = useRef(null);

    return(
        <div>
            <input ref={refInput}/>
            <EmojiPicker ref={refInput}/>
        </div>
    );
}
