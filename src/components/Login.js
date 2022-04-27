import { useState } from 'react'
import Axios from "axios";


function Login(props){
    const [formulary, setForm] = useState("Login")

    function changeForm(){
        if (formulary === "Login") setForm("Register")
        else if(formulary === "Register") setForm("Login")
    }

    return(
        <div className="session-user">
            <div className="formulary">
                {formulary === "Login" ? <SignIn changeForm={changeForm} currentUser={() => props.currentUser()}/> : <SignUp changeForm={changeForm}/>}
            </div>
        </div>
    )
}

function SignIn(props){
    const [mistake, setMistake] = useState("")

    async function verify(){
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        Axios({
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            withCredentials: true,
            url: "http://localhost:8000/login",
          }).then((res) => {
              setMistake(res.data)
              props.currentUser()
          }).catch(setMistake("Connection Error"));
        
    }

    return(
        <div>
            <input type='text' className='username' id='username' placeholder="Username"></input>
            <input type='password' className='password' id='password' placeholder="Password"></input>

            <button onClick={() => verify()} className='button'>Login</button>
            <p onClick={() => props.changeForm()}>Register</p>
            <p className='alert-error'>{mistake}</p>
        </div>
    )
}

function SignUp(props){
    const [mistake, setMistake] = useState("")

    async function verify(){
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        let passwordRepeat = document.getElementById('passwordRepeat').value
        try{
                const requestOptions={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password,
                        passwordRepeat
                    })
                }
                let response = await fetch(`${process.env.REACT_APP_API}/registerUser`, requestOptions)
                let data = await response.json()
                setMistake(data)
                props.changeForm()
            }catch(err){
                setMistake("Connection Error")
                console.log(err)
            }
        
    }

    return(
        <div>
            <input type='text' className='username' id='username' placeholder="Username"></input>
            <input type='password' className='password' id='password' placeholder="Password"></input>
            <input type='password' className='passwordRepeat' id='passwordRepeat' placeholder="Confirm Password"></input>

            <button onClick={() => verify()} className='button'>Sing up</button>
            <p onClick={() => props.changeForm()}>Login</p>
            <p className='alert-error'>{mistake}</p>
        </div>
    )
}

export default Login