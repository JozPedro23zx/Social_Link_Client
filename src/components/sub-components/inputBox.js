import {useState} from 'react'
import '../../customStyles/inputBox.css'
import Axios from "axios";


function InputBox(props){
    const [showPlaceholder, setPlaceholder] = useState("block")
    const [showCounter, setShowCounter] = useState("none")
    const [activeButton, setActive] = useState("no-active")
    const [counter, setCounter] = useState(100)

    const [imageSelected, setImage] = useState('')


    function preview_image(event){
        var reader = new FileReader()
        reader.onload = ()=>{
            var output = document.getElementById('output_image')  
            output.src = reader.result
        } 
        reader.readAsDataURL(event.target.files[0])
        setImage(event.target.files[0])

        setPlaceholder("none")
        setShowCounter("block")
        setActive("active")
    }

    function tweet(){
        let content = document.getElementById('dataContent')
        
        if(imageSelected === ''){
            sendData(content, imageSelected)
        }else{
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", "xxtdt0kg")

            Axios.post("https://api.cloudinary.com/v1_1/dhuy2dkhc/image/upload", formData)
            .then((response) =>{
                console.log(response.data.public_id)
                sendData(content, response.data.public_id)
            })
        }
    }

    function sendData(content, image){
        Axios({
            method: 'POST',
            data: {
                content: content.innerHTML,
                imageId: image
            },
            withCredentials: true,
            url: "http://localhost:8000/createPost",
        }).then((res) => {
            content.innerHTML = ''
            validate(content)
        })

        props.searchPost('')
    }

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

        if(currentLength > 0  || imageSelected !== ''){
            setPlaceholder("none")
            setShowCounter("block")
            setActive("active")
        }else{
            setPlaceholder("block")
            setShowCounter("none")
            setActive("no-active")
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
                        id='dataContent'
                        className="input editable" 
                        contenteditable="true" 
                        spellcheck="true"
                        onKeyPress={(e) => KeyPress(e)}
                        onKeyUp={(e) => KeyUp(e)}
                    ></div>
                </div>
                <img id="output_image"/>
            </div>
            <div className="bottom">
                <div className="content-button">
                    <label className='file-upload'>
                        <input type='file' accept="image/*" onChange={(event) => preview_image(event)}></input>
                        Upload Image
                    </label>
                    <span className="counter" style={{display: showCounter}}>{counter}</span>
                    <button onClick={() => tweet()} className={activeButton}>Publish</button>
                </div>
            </div>
        </div>
    )
}

export default InputBox