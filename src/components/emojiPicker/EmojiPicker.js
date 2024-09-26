import {forwardRef,useState,useRef,useEffect} from "react";
import { data as emojiList } from "./Data";
import EmojiSearch from "./emojiSearch";
import EmojiButton from "./emojiButton";
import styles from "./emojiPicker.module.scss";


export function EmojiPicker(props,inputRef){

    const [isOpen,setIsOpen] = useState(false);
    const [emojis,setEmojis] = useState(emojiList)
    const containerRef = useRef(null);

    useEffect(()=>{

        window.addEventListener('click',e=>{
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });


    },[]);


    function handleClickOpen(){
        setIsOpen(!isOpen)
    }

    function handleSearch(e){
        const q=e;

        if(!!q){ //si hay algo en value
            const search = emojiList.filter((emoji)=>{
                return (emoji.name.toLowerCase().includes(q.target.value) || emoji.keywords.toLowerCase().includes(q.target.value))   ;
            });

            setEmojis(search);
            console.log("epa");
        }else{
            setEmojis(emojiList);
            console.log("hola")
        }
    }

    function handleClickEmoji(emoji){
        const cursorpost = inputRef.current.selectionStart;//guardar seleccion del cursor
        const text = inputRef.current.value;
        const prev = text.slice(0,cursorpost); //divide el texto en 2
        const next = text.slice(cursorpost);

        inputRef.current.value = prev+emoji.symbol+next;
        inputRef.current.selectionStart=cursorpost+emoji.symbol.length;
        inputRef.current.selectionEnd=cursorpost+emoji.symbol.length;
        inputRef.current.focus();
    }


    

    return(
        <div  ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😘</button>
            {isOpen ? ( 
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch}/>
                    <div>
                        {emojis.map((emoji)=>(<EmojiButton onClick={handleClickEmoji} emoji={emoji} key={emoji.symbol}/>))}
                    </div>
                </div>):("")}
        </div>
    );
}

export default forwardRef(EmojiPicker);