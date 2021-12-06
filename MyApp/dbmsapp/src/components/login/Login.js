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
        
        axios.post("https://nitc-mess-manager.herokuapp.com/login/add", user)
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
        <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="text-muted mb-4">Login to your Account</h2>
                        </div>
                    </div>
                    {user.isStud === "student" ?
                        <span>
                            <h3 className="form-control-label">Dont have an account ?
                                <nav>
                                    <Link to="/register"><u>Register</u></Link>
                                </nav>
                            </h3>
                        </span> : <div></div>}

                    <div>
                        <form onSubmit={login}>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="radio" checked={user.isStud === "student"} id="student" name="isStud" value="student" onChange={handleChange} />
                                        <label className="form-control-label" htmlFor="student">Student</label><br />
                                        <input type="radio" checked={user.isStud === "contractor"} id="contractor" name="isStud" value="contractor" onChange={handleChange} />
                                        <label className="form-control-label" htmlFor="contractor">Contractor</label><br />

                                        <div className="form-group focused">
                                            <label htmlFor="email" className="form-control-label" >Email</label>
                                            <input type="text" id="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-alternative" placeholder="Email" />
                                        </div>

                                        <div className="form-group focused">
                                            <label htmlFor="password" className="form-control-label" >Password</label>
                                            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-alternative" placeholder="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input name="Login" className="btn btn-sm btn-primary" value="LogIn" type="submit" />
                            </div>
                        </form>

                        <br />
                        <nav className="form-control-label">
                            <Link to="/"><u>Home</u></Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login
