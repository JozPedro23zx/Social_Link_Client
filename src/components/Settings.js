import { useState, useEffect } from "react"
import '../customStyles/Modal.css'
import '../customStyles/Settings.css'
import Axios from "axios";



function Settings(props){
    const [imageSelected, setImage] = useState('')
    const [user, setUser] = useState('')

    const [successMessage, setSuccessMessage] = useState('')
    const [screen, setScreen] = useState("close")
    
    
    useEffect(() =>{
        const fetchItems = async () =>{
            try{
                let dataUser = await fetch(`${process.env.REACT_APP_API}/getUser/${props.userId}`)
                let user = await dataUser.json()
                setUser(user)
            }catch(err){
                console.log(err)
            }
        }
        (async () => await fetchItems())()
    }, [props.userId])
    
    function preview_image(event){
        var reader = new FileReader()
        reader.onload = ()=>{
            var output = document.getElementById('output_image')  
            output.src = reader.result
        } 
        reader.readAsDataURL(event.target.files[0])
        setImage(event.target.files[0])
    }
    
    function modalScreen(state){
        setScreen(state)
    }

    function showMessage(){
        setSuccessMessage('Your data has been successfully modified')
    }
    
    return(
        <div className="settings">
            <h3>{successMessage}</h3>
            <div className="form-settings">
                <p>Name</p>
                <input id="username" type='text'></input>
                <p>Password</p>
                <input id="password" type='password'></input>
                <label className="avatar-upload">
                    <input id="avatar" type='file' accept="image/*" onChange={(event) => preview_image(event)}></input>
                    <img className="avatar" id="output_image" src={user.avatar}/>
                    <p>Edit your avatar</p>
                </label>
                <br></br>
                <button onClick={() => modalScreen("open")}>Change</button>
            </div>
            {screen === "open" ? <Modal  imageSelected={imageSelected} modalScreen={(state) => modalScreen(state)} showMessage={showMessage}/> : <></>}
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
            url: `${process.env.REACT_APP_API}/changeUserData`
        }).then((res) =>{
            if(!res.data){
                props.modalScreen("close")
                setInput("normal") 
                setMessage(res.data)
                props.showMessage()
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
            sendData(username, password, passwordConfirm, imageSelected)
        }else{
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", "ruga5ft5")

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