import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./register.css"
import axios from "axios"

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate()

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };
    const addUserdata = async (e) => {
        e.preventDefault()
        const {email, password} = inpval

        const data = await fetch("https://fierce-rose-sea-lion.cyclic.app/api/login", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                email, password
            })
        })
        const res = await data.json()

        const token = res.user

        if(res.user) {
            alert("Successfully signed up")
            localStorage.setItem("token", token)
            setInpval({...inpval, email: "", password: "",})
            navigate("/")
        } else {
            alert("Please check your username and password")
        }
    }
    

  return (
    <>
    <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Login</h1>
                <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                    your tasks! We hope that you will get like it.</p>
            </div>

            <form>
                <div className="form_input">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                </div>
                <div className="form_input">
                    <label htmlFor="password">Password</label>
                    <div className="two">
                        <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                        <div className="showpass" onClick={() => setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                    </div>
                </div>

                <button className='btn' onClick={addUserdata}>Login</button>
                <p>Don't have an account <Link to="/register">Sign up</Link></p>
            </form>
        </div>
    </section>
</>
  )
}

export default Login