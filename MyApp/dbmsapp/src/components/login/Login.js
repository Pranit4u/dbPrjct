import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = ({ setLoginUser }) => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        isStud: "",
        firstname: "",
        lastname: "",
        batch: "",
        roll: "",
        mess: "",
        mob: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value

        })
    }

    const login = (e) => {
        e.preventDefault()
        if (user.email.length === 0 || user.password.length === 0) {
            return;
        }
        axios.post("http://localhost:5000/login/add", user)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "-1":
                        alert("User Not Registered");
                        break;
                    case "0":
                        alert("wrong credential");
                        break;
                }
                if (r.email) {
                    signIn(r)
                }
            })
            .catch((e) => {
                console.log("error catch ->" + e)
            })
    }

    const signIn = (user) => {
        setLoginUser(user);
        navigate('/');
    }

    return (
        <>
            <div>
                <div>
                    Log In to your account
                </div>
                {user.isStud === "student" ? <span>
                    Dont have an account ?
                    <nav>
                        <Link to="/register">Register</Link>
                    </nav>
                </span> : <div></div>}

                <div>
                    <form onSubmit={login}>

                        <input type="radio" checked={user.isStud === "student"} id="student" name="isStud" value="student" onChange={handleChange} />
                        <label htmlFor="student">Student</label><br />
                        <input type="radio" checked={user.isStud === "contractor"} id="contractor" name="isStud" value="contractor" onChange={handleChange} />
                        <label htmlFor="contractor">Contractor</label><br />

                        <div>
                            <input type="text" id="create-account-first-name" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                        </div>

                        <div>
                            <input type="password" id="create-account-email" name="password" value={user.password} onChange={handleChange} placeholder="password" />
                        </div>
                        <div>
                            <input name="Login" type="submit" />
                        </div>
                    </form>


                </div>
            </div>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
            </div>

        </>
    )
}

export default Login
