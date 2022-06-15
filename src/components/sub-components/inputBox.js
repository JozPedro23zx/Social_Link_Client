import {useState} from 'react'
import Axios from "axios";
import imgIcon from '../../images/icon-img.png'


function InputBox(props){
    const [showPlaceholder, setPlaceholder] = useState("block")
    const [showImage, setShowImage] = useState('none')
    
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
        setActive("active")
        setShowImage('block')
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
                sendData(content, response.data.public_id)
            })
        }
        setShowImage('none')
    }

    async function sendData(content, image){
        await Axios({
            method: 'POST',
            data: {
                content: content.innerHTML,
                imageId: image,
                idUser: props.userId
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API}/createPost`,
        }).then((res) => {
            content.innerHTML = ''
            validate(content)
        })

        props.fetchItems()
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
            setActive("active")
        }else{
            setPlaceholder("block")
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
                <img id="output_image" style={{display: showImage}}/>
            </div>
            <div className="bottom">
                <div className="content-button">
                    <label className='file-upload'>
                        <input type='file'  onChange={(event) => preview_image(event)}></input>
                        <img src={imgIcon} />
                    </label>
                    <span className="counter" >{counter}</span>
                    <button onClick={() => tweet()} className={activeButton}>Publish</button>
                </div>
            </div>
        </div>
    )
}

export default InputBox