import { useState } from 'react'

function Login(){
    const [formulary, setForm] = useState("Login")

    return(
        <div className="session-user">
            <div className="formulary">
                {formulary === "Login" ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    )
}

function LoginForm(){
    return(
        <div>
            <input type='text' id='username' placeholder="Username"></input>
            <input type='password' id='password' placeholder="Password"></input>
            <button className='button'>Login</button>
            <p>Register</p>
        </div>
    )
}

function RegisterForm(){
    return(
        <div>
            <input type='text' id='username' placeholder="Username"></input>
            <input type='password' id='password' placeholder="Password"></input>
            <input type='password' id='passwordConfirm' placeholder="Confirm Password"></input>
            <button className='button'>Sing up</button>
            <p>Login</p>
        </div>
    )
}

export default Login