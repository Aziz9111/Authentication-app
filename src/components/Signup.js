import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import '../style.css';

export default function Signup() {
    const history = useNavigate();
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    /* const [confirm, setConfirm] = useState('') */

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleUser = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

   /*  const handleConfPassword = (e) => {
        setConfirm(e.target.value)
    } */

    async function Submit(e) {
        e.preventDefault();
        try{

            await axios.post("http://localhost:8000/signup", {
            email, password, username
            })
            .then(res => {
                if(res.data === "exist"){
                    alert("User already exists")
                }
                else if(res.data === "notexist"){
                     alert("Signup successful! You can now login.");
                     history("/home", {state:{id: email}})
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
        <h1>Signup Page</h1>
        <form className="login-form">
            <div className="input-group">
                <label>Username: </label>
                <input className="input-field" type="username" onChange={handleUser} placeholder="Enter Username" id="username" required/>
            </div>
            <div className="input-group">
                <label>Email: </label>
                <input className="input-field" type="email" onChange={handleEmail} placeholder="Enter Email Address" id="email" required/>
            </div>
            <div className="input-group">
                <label>Password: </label>
                <input className="input-field" type="password" onChange={handlePassword} placeholder="Enter Password" id="password" required/>
            </div>
            <div className="input-group">
                {/* <label>Confirm Password: </label>
                <input className="input-field" type="password" onChange={handleConfPassword}  labelFor="confirm-password" autoComplete="confirm-password" placeholder="Confirm The Password" id="confirm-password" required/> */}
            </div>
            <button type="submit" onClick={Submit}>Submit</button>
        </form> 
        <div className="create-account"> 
        <p>I have an account 
            <Link to="/" > Login</Link>
        </p>
        </div>
        </div>

    )
}
