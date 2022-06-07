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
                {formulary === "Login" ? <SignIn changeForm={changeForm} currentUser={() => props.currentUser()} getToken={(tokenResult) => props.getToken(tokenResult)}/> : <SignUp changeForm={changeForm}/>}
            
        </div>
    )
}

function SignIn(props){
    const [mistake, setMistake] = useState("")

    async function verify(){
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        await Axios({
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API}/login`,
        }).then((res) => {
              console.log(res.data)
              setMistake(res.data.message)
              props.getToken(res.data.token)
            //   props.currentUser()
        }).catch((err) => console.log(err));



        // const requestOptions={
        //     method: "POST",
        //     credentials: 'include',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     }),
        // }
        // let response = await fetch(`${process.env.REACT_APP_API}/login`, requestOptions)
        // let data = await response.json()
        // setMistake(data)
        // if(data[0] === '') props.changeForm()
    
    }

    return(
        <div  className="formulary">
            <p className='alert-error'>{mistake}</p>
            <input type='text' className='username' id='username' placeholder="Username"></input>
            <input type='password' className='password' id='password' placeholder="Password"></input>

            <button onClick={() => verify()} className='button'>Login</button>
            <p>Not have account?<span onClick={() => props.changeForm()}>Sign Up here!</span></p>
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
                if(data[0] === '') props.changeForm()
            }catch(err){console.log(err)}
        
    }

    return(
        <div  className="formulary">
            <p className='alert-error'>{mistake}</p>
            <input type='text' className='username' id='username' placeholder="Username"></input>
            <input type='password' className='password' id='password' placeholder="Password"></input>
            <input type='password' className='passwordRepeat' id='passwordRepeat' placeholder="Confirm Password"></input>

            <button onClick={() => verify()} className='button'>Sing up</button>
            <p>Go <span onClick={() => props.changeForm()}>Sign In</span> page to make a login </p>
        </div>
    )
}

export default Login