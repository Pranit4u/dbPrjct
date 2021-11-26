import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
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

    //register function 
    const register = (e) => {
        e.preventDefault()
        const { firstname, lastname, batch, roll, mess, mob, email, password } = user;
        if (firstname.length === 0 || lastname.length === 0 || mob.length !== 10 || email.length === 0 || password.length == 0 || mess.length === 0 || batch.length === 0 || roll.length === 0) {
            alert("invalid details");
            return;
        }
        axios.post("https://nitc-mess-manager.herokuapp.com/register/add", user)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Bills Generated Successfully");
                        navigate('/login');

                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            })

    }



    return (
        <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="text-muted mb-4">Create Account As Student</h2>
                        </div>
                    </div>
                    <span className="form-control-label">
                        Already have an account ?
                        <nav>
                            <Link to="/login"><u>Sign In</u></Link>
                        </nav>
                    </span>
                    <br/>
                    <div>
                        <form onSubmit={register}>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group focused">

                                            <input type="text" id="create-account-firstname" name="firstname" value={user.firstname} onChange={handleChange} className="form-control form-control-alternative" placeholder="First Name" />
                                        </div><div className="form-group focused"><input type="text" id="create-account-lastname" name="lastname" value={user.lastname} onChange={handleChange} className="form-control form-control-alternative" placeholder="Last Name" />
                                        </div><div className="form-group focused"><input type="text" id="create-account-mob" name="mob" value={user.mob} onChange={handleChange} className="form-control form-control-alternative" placeholder="Mobile No" />
                                        </div><div className="form-group focused"><input type="text" id="create-account-roll" name="roll" value={user.roll} onChange={handleChange} className="form-control form-control-alternative" placeholder="Roll No" />
                                        </div>
                                        <div className="form-group focused">
                                            <h3 className="form-control-label">Batch</h3>
                                            <input type="radio" id="A" name="batch" value="A" onChange={handleChange} />
                                            <label className="form-control-label" htmlFor="A">A</label><br />
                                            <input type="radio" id="B" name="batch" value="B" onChange={handleChange} />
                                            <label className="form-control-label" htmlFor="B">B</label></div>
                                        <div className="form-group focused">

                                            <h3 className="form-control-label">Mess</h3>
                                            <input type="radio" id="A" name="mess" value="A" onChange={handleChange} />
                                            <label className="form-control-label" htmlFor="A">A</label><br />
                                            <input type="radio" id="B" name="mess" value="B" onChange={handleChange} />
                                            <label className="form-control-label" htmlFor="B">B</label></div>
                                        <div className="form-group focused">

                                            <input type="text" id="create-account-email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-alternative" placeholder="Email" /></div>
                                        <div className="form-group focused">

                                            <input type="password" id="create-account-password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-alternative" placeholder="password" /></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input name="Register" className="btn btn-sm btn-primary" type="submit" />
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

export default Register
