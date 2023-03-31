import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./register.css"

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate()

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        gender: ""
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
        const {name, email, password, gender} = inpval

        const data = await fetch("https://fierce-rose-sea-lion.cyclic.app/api/register", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                name, email, password, gender
            })
        })
        const res = await data.json()
        console.log(res);
        if(res) {
            alert("Successfully signed up")
            setInpval({...inpval, name:"", email: "", password: "", gender: ""})
            navigate("/")
        }
    }
  return (
    <>
    <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Sign Up</h1>
                <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                    your tasks! We hope that you will get like it.</p>
            </div>

            <form>
                <div className="form_input">
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Name' />
                </div>
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

                <div className="form_input">
                    <label htmlFor="gender">Gender</label>
                    <input type="text" onChange={setVal} value={inpval.gender} name="gender" id="gender" placeholder='Enter Your gender' />
                </div>

                <button className='btn' onClick={addUserdata}>Sign Up</button>
                <p>Already have an account? <Link to="/">Log In</Link></p>
            </form>
        </div>
    </section>
</>
  )
}

export default Register