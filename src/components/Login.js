import { useState } from 'react'

function Login(){
    const [formulary, setForm] = useState("Login")

    function changeForm(){
        console.log("Change Formulary")
        if (formulary === "Login") setForm("Register")
        else if(formulary === "Register") setForm("Login")
    }

    return(
        <div className="session-user">
            <div className="formulary">
                {formulary === "Login" ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
            </div>
        </div>
    )
}

function LoginForm(props){
    return(
        <form>
            <input type='text' className='username' name='username' placeholder="Username"></input>
            <input type='password' className='password' name='password' placeholder="Password"></input>

            <button type="submit" className='button'>Login</button>
            <p onClick={() => props.changeForm()}>Register</p>
            <p className='alert-error'></p>
        </form>
    )
}

function RegisterForm(props){
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
                console.log(data)
                setMistake(data)
                // props.changeForm()
            }catch(err){
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