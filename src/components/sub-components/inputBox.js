import {useState} from 'react'
import '../../customStyles/inputBox.css'

function InputBox(){
    const [showPlaceholder, setPlaceholder] = useState("block")
    const [showCounter, setShowCounter] = useState("none")
    const [activeButton, setActive] = useState("no-active")
    const [counter, setCounter] = useState(100)

    function KeyUp(e){
        let element = e.target
        validate(element)
    }

    function KeyPress(e){
        let element = e.target
        validate(element)
        setPlaceholder("none")
    }

    function validate(element){
        let maxLength = 100
        let currentLength = element.innerText.length

        if(currentLength <= 0){
            setPlaceholder("block")
            setShowCounter("none")
            setActive("no-active")
        }else{
            setPlaceholder("none")
            setShowCounter("block")
            setActive("active")
        }

        setCounter(maxLength - currentLength)
        if(currentLength >= maxLength) setActive("no-active")
        
    }

    return(
        <div className="wrapper">
            <div className="input-box">
                <div className="tweet-area">
                    <span className="placeholder" style={{display: showPlaceholder}}>What's happening?</span>
                    <div 
                        className="input editable" 
                        contenteditable="true" 
                        spellcheck="true"
                        onKeyPress={(e) => KeyPress(e)}
                        onKeyUp={(e) => KeyUp(e)}
                    ></div>
                </div>
            </div>
            <div className="bottom">
                <div className="content-button">
                    <span className="counter" style={{display: showCounter}}>{counter}</span>
                    <button className={activeButton}>Tweet</button>
                </div>
            </div>
        </div>
    )
}

export default InputBox