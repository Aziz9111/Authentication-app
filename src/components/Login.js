import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import '../style.css';

export default function Login() {

    const history = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    async function Submit(e) {
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/", {
            email,password
            })
            .then(res => {
                if(res.data === "valid"){
                    alert("Login successful!");
                    history("/home", {state:{id: email}})
                }
                else if(res.data === "notexist"){
                    alert("User have not signed up ")
                }
                else if(res.data === "invalid"){
                    alert(" Wrong password")
                }
            })
            .catch(e => {
                alert("Wrong details")
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className="login-container">
        <h1>Login Page</h1>
        <form className="login-form">
            <div className="input-group">
                <label>Email: </label>
                <input className="input-field" type="email" onChange={handleEmail} placeholder="Enter Your Email Address" id="email" required/>
            </div>
            <div className="input-group">
                <label>Password: </label>
                <input className="input-field" type="password" onChange={handlePassword} placeholder="Enter Your Password" id="password" required/>
            </div>
            <button type="submit" onClick={Submit}>Submit</button>
        </form> 
        <div className="create-account"> 
        <p>I don't have an account 
            <Link to="/signup" > Signup</Link>
        </p>
        </div>
        </div>

    )
}
