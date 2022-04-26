import { useState } from "react"
import '../customStyles/Settings.css'
import Axios from "axios";



function Settings(){
    const [imageSelected, setImage] = useState('')
    
    const [screen, setScreen] = useState("close")
    function modalScreen(state){
        console.log(state)
        setScreen(state)
    }

    return(
        <div>
            <div>
                <p>Name</p>
                <input id="username" type='text'></input>
                <p>Password</p>
                <input id="password" type='password'></input>
                <p>Avatar</p>
                <input id="avatar" type='file' onChange={(event) => setImage(event.target.files[0])}></input>
                <br></br>
                <button onClick={() => modalScreen("open")}>Change</button>
            </div>
            {screen === "open" ? <Modal imageSelected={imageSelected} modalScreen={(state) => modalScreen(state)}/> : <></>}
        </div>
    )
}

function Modal(props){
    const [input, setInput] = useState("normal")
    const [message, setMessage] = useState('')
    const imageSelected = props.imageSelected

    function sendData(username, password, passwordConfirm, avatarId){
        Axios({
            method: 'POST',
            data: {
                username,
                password,
                avatarId,
                passwordConfirm: passwordConfirm.value
            },
            withCredentials: true,
            url: 'http://localhost:8000/changeUserData'
        }).then((res) =>{
            if(!res.data){
                props.modalScreen("close")
                setInput("normal") 
                setMessage(res.data)
                alert("Your data has been successfully modified")
            }else{
                passwordConfirm.value = ''
                setInput("error") 
                setMessage(res.data)
            }
        })
    }

    function changeUserInfo(){
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        let passwordConfirm = document.getElementById('checkPassword')
        
        if(imageSelected === ''){
            console.log("Oi")
            sendData(username, password, passwordConfirm, imageSelected)
        }else{
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", "ruga5ft5")
            console.log(formData)

            Axios.post("https://api.cloudinary.com/v1_1/dhuy2dkhc/image/upload", formData)
            .then((response) =>{
                sendData(username, password, passwordConfirm, response.data.public_id)
            })
        }

    }

    return(
        <section className="modal-wrapper">
            <div className="modal">
                <h2>Enter your password</h2>
                <div>
                    <input type="password" className={`checkPassword ${input}`} id="checkPassword" placeholder={message}/>
                    <div className="buttons">
                        <div className="editCancel" onClick={() => props.modalScreen("close")}>Cancel</div>
                        <button className="editConfirm" onClick={() => changeUserInfo()}>Confirm</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings